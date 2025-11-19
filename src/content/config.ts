import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		// status: z.string(),
		title: z.string(),
		author: z.string(),
		description: z.string(),
		// slug: z.string(),
		featured: z.boolean(),
		// tags: z.string(),
		// image: z.string(),
		// dateCreated: z.string(),
		// dateUpdated: z.string(),
		// datePublished: z.coerce.data(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		coverImageCredit: z.string().optional(),
	}),
})

const bookReview = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string().optional(),
		rating: z.string(),
		genre: z.string(),
		format: z.string(),
		link: z.string(),
		cover: z.string().optional(),
		fullReview: z.boolean().optional(),
	}),
})

export const collections = { blog, 'book-reviews': bookReview }
