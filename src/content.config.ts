import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		author: z.string().default('Greg Barbosa'),
		description: z.string(),
		featured: z.boolean().default(false),
		category: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		coverImageCredit: z.string().optional(),
	}),
})

const readingList = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/content/reading-list',
	}),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string().optional(),
		rating: z.string(),
		genre: z.string(),
		format: z.string(),
		link_amazon: z.string(),
		link_bookshop: z.string().optional(),
		cover: z.string().optional(),
		fullReview: z.boolean().optional(),
	}),
})

const projects = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/content/projects',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		link: z.string().optional(),
		repo: z.string().optional(),
		techStack: z.array(z.string()).optional(),
		featured: z.boolean().optional(),
	}),
})

const freebies = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/content/freebies',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(['final-cut-pro', 'lightroom', 'ios-shortcuts', 'other']),
		downloadUrl: z.string(),
		coverImage: z.string().optional(),
		featured: z.boolean().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
})

export const collections = {
	blog,
	'reading-list': readingList,
	projects,
	freebies,
}
