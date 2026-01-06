import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		// status: z.string(),
		title: z.string(),
		author: z.string().default('Greg Barbosa'),
		description: z.string(),
		// slug: z.string(),
		featured: z.boolean().default(false),
		category: z.string().optional(),
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

const readingList = defineCollection({
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

const projects = defineCollection({
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
