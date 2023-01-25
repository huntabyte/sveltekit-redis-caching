import type { PageServerLoad } from "./$types"
import { redis } from "$lib/server/redis"
import { error } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	const q = url.searchParams.get("q")
	if (!q) {
		throw error(400, "No query provided")
	}

	const getMovies = async (q: string) => {
		const cached = await redis.get(q)
		setHeaders({ "cache-control": "max-age=604800" })

		if (cached) {
			console.log("Cache hit")
			return JSON.parse(cached)
		}

		console.log("Cache miss")
		const res = await fetch(`https://search.imdbot.workers.dev/?q=${q}`)
		const movies = await res.json()

		redis.set(q, JSON.stringify(movies.description), "EX", 604800)

		return movies.description
	}

	return {
		movies: getMovies(q),
	}
}
