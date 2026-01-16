#!/usr/bin/env node

/**
 * Fetch book covers from Hardcover API
 * Usage: HARDCOVER_API_TOKEN=your_token node scripts/fetch-book-covers.js
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const ENDPOINT = 'https://api.hardcover.app/v1/graphql'
const COVERS_DIR = path.join(projectRoot, 'src/assets/book-covers')
const TOKEN = process.env.HARDCOVER_API_TOKEN

if (!TOKEN) {
	console.error('❌ Error: HARDCOVER_API_TOKEN environment variable not set')
	console.error(
		'Usage: HARDCOVER_API_TOKEN=your_token node scripts/fetch-book-covers.js'
	)
	process.exit(1)
}

const books = [
	{
		title: 'Ask',
		author: 'Ryan Levesque',
		filename: 'ask.jpeg',
		search: 'Ask',
	},
	{
		title: 'Dune',
		author: 'Frank Herbert',
		filename: 'dune.jpeg',
		search: 'Dune',
	},
	{
		title: 'The Will to Change',
		author: 'Bell Hooks',
		filename: 'the-will-to-change.jpg',
		search: 'The Will to Change',
	},
	{
		title: 'The Three-Body Problem',
		author: 'Liu Cixin',
		filename: 'the-three-body-problem.jpg',
		search: 'The Three-Body Problem',
	},
	{
		title: 'Radical Candor',
		author: 'Kim Scott',
		filename: 'radical-candor.jpg',
		search: 'Radical Candor',
	},
	{
		title: 'On Writing Well',
		author: 'William Zinsser',
		filename: 'on-writing-well.jpg',
		search: 'On Writing Well',
	},
	{
		title: 'Filterworld',
		author: 'Kyle Chayka',
		filename: 'filterworld.jpg',
		search: 'Filterworld',
	},
	{
		title: 'Effortless',
		author: 'Greg McKeown',
		filename: 'effortless.jpg',
		search: 'Effortless',
	},
	{
		title: 'The 7 Habits',
		author: 'Stephen Covey',
		filename: 'the-7-habits.jpg',
		search: 'The 7 Habits of Highly Effective People',
	},
	{
		title: 'How to Change Your Mind',
		author: 'Michael Pollan',
		filename: 'how-to-change-your-mind.jpg',
		search: 'How to Change Your Mind',
	},
]

function makeGraphQLQuery(searchTerm) {
	// Use _eq for exact matching on title (case-sensitive)
	return {
		query: `query {
      editions(where: {title: {_eq: "${searchTerm}"}}, limit: 1) {
        id
        title
        image {
          url
        }
        book {
          title
          slug
          image {
            url
          }
        }
      }
    }`,
	}
}

function httpPost(url, data, headers) {
	return new Promise((resolve, reject) => {
		const postData = JSON.stringify(data)
		const urlObj = new URL(url)

		const options = {
			hostname: urlObj.hostname,
			port: urlObj.port,
			path: urlObj.pathname + urlObj.search,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData),
				...headers,
			},
		}

		const req = https.request(options, (res) => {
			let body = ''
			res.on('data', (chunk) => {
				body += chunk
			})
			res.on('end', () => {
				try {
					resolve({
						status: res.statusCode,
						body: JSON.parse(body),
					})
				} catch (e) {
					resolve({
						status: res.statusCode,
						body,
					})
				}
			})
		})

		req.on('error', reject)
		req.write(postData)
		req.end()
	})
}

function downloadImage(url, filepath) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(filepath)
		https
			.get(url, (response) => {
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					resolve()
				})
			})
			.on('error', (err) => {
				fs.unlink(filepath, () => {})
				reject(err)
			})
	})
}

async function fetchFromOpenLibrary(title, author) {
	return new Promise((resolve) => {
		const query = encodeURIComponent(`${title} ${author}`)
		const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`

		https
			.get(url, (res) => {
				let body = ''
				res.on('data', (chunk) => {
					body += chunk
				})
				res.on('end', () => {
					try {
						const data = JSON.parse(body)
						const doc = data.docs?.[0]
						if (doc?.cover_id) {
							// Open Library cover URL format
							const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_id}-M.jpg`
							resolve(coverUrl)
						} else {
							resolve(null)
						}
					} catch (e) {
						resolve(null)
					}
				})
			})
			.on('error', () => resolve(null))
	})
}

async function fetchBookCover(book, retryWithAuthor = false) {
	try {
		const searchTerm = retryWithAuthor ? book.author : book.search
		console.log(
			`\n📚 Fetching cover for: ${book.title} by ${book.author}${retryWithAuthor ? ' (retry with author)' : ''}`
		)

		const query = makeGraphQLQuery(searchTerm)
		const response = await httpPost(ENDPOINT, query, {
			Authorization: `Bearer ${TOKEN}`,
		})

		if (response.status !== 200) {
			console.error(`  ❌ API error (${response.status}):`, response.body)
			return false
		}

		const data = response.body

		if (data.errors) {
			console.error('  ❌ GraphQL error:', data.errors)
			return false
		}

		const editions = data.data?.editions
		if (!editions || editions.length === 0) {
			console.error('  ❌ No results found')
			// If first attempt found no results, don't retry
			return false
		}

		// Try to get image from edition first, then fall back to book
		const imageUrl = editions[0].image?.url || editions[0].book?.image?.url
		if (!imageUrl) {
			// If we already tried with author, try Open Library as final fallback
			if (retryWithAuthor) {
				console.log('  ⏳ Hardcover has no image, trying Open Library...')
				const olImageUrl = await fetchFromOpenLibrary(book.title, book.author)
				if (olImageUrl) {
					console.log(`  ✓ Found on Open Library`)
					console.log(`  ⬇️  Downloading from: ${olImageUrl}`)
					const filepath = path.join(COVERS_DIR, book.filename)
					try {
						await downloadImage(olImageUrl, filepath)
						console.log(`  ✅ Saved to: ${book.filename}`)
						return true
					} catch (e) {
						console.error(
							'  ❌ Failed to download from Open Library:',
							e.message
						)
						return false
					}
				}
				console.error('  ❌ Not found on Open Library either')
				return false
			}
			// Otherwise, retry searching by author
			console.log('  ⏳ No image found with title, trying search by author...')
			return fetchBookCover(book, true)
		}

		const title = editions[0].book?.title || editions[0].title
		console.log(`  ✓ Found: ${title}`)
		console.log(`  ⬇️  Downloading from: ${imageUrl}`)

		const filepath = path.join(COVERS_DIR, book.filename)
		await downloadImage(imageUrl, filepath)

		console.log(`  ✅ Saved to: ${book.filename}`)
		return true
	} catch (error) {
		console.error(`  ❌ Error: ${error.message}`)
		return false
	}
}

async function main() {
	console.log('🎯 Fetching book covers from Hardcover API\n')
	console.log(`Covers directory: ${COVERS_DIR}`)
	console.log(`Endpoint: ${ENDPOINT}`)
	console.log(`Token: ${TOKEN.substring(0, 10)}...`)

	const results = []
	for (const book of books) {
		const success = await fetchBookCover(book)
		results.push({ book: book.title, success })
	}

	console.log('\n📊 Summary:')
	console.log('─'.repeat(50))
	const successful = results.filter((r) => r.success).length
	console.log(`✅ Successful: ${successful}/${books.length}`)
	results.forEach((r) => {
		const icon = r.success ? '✅' : '❌'
		console.log(`  ${icon} ${r.book}`)
	})

	if (successful === books.length) {
		console.log('\n🎉 All covers downloaded successfully!')
		process.exit(0)
	} else {
		console.log(`\n⚠️  ${books.length - successful} book(s) failed`)
		process.exit(1)
	}
}

main().catch((error) => {
	console.error('Fatal error:', error)
	process.exit(1)
})
