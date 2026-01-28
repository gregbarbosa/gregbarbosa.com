import type { CollectionEntry } from 'astro:content'

export function filterDrafts(posts: CollectionEntry<'blog'>[]) {
	return import.meta.env.PROD ? posts.filter((post) => !post.data.draft) : posts
}
