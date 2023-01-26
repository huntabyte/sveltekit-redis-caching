import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { TMDB_API_KEY } from "$env/static/private"
import { redis } from "$lib/server/redis"

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	const q = url.searchParams.get("q")
	if (!q) {
		throw error(400, "No query provided")
	}

	const getMovies = async (q: string) => {
		const cached = await redis.get(q)

		if (cached) {
			console.log("Cache hit!")

			return JSON.parse(cached)
		}

		console.log("Cache miss!")

		const res = await fetch(
			`https://api.themoviedb.org/3/search/movie/?api_key=${TMDB_API_KEY}&query=${q}`,
		)

		const cacheControl = res.headers.get("cache-control")

		if (cacheControl) {
			setHeaders({ "cache-control": cacheControl })
		}

		if (!res.ok) {
			throw error(res.status, "Could not fetch movies")
		}

		const movies = await res.json()

		redis.set(q, JSON.stringify(movies.results), "EX", 600)
		return movies.results
	}

	return {
		movies: getMovies(q),
	}
}
