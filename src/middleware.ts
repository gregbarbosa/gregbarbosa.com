import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = async (ctx, next) => {
	const response = await next()
	response.headers.set('X-Frame-Options', 'SAMEORIGIN')
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload'
	)
	return response
}
