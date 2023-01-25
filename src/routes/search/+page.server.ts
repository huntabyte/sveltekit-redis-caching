import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { TMDB_API_KEY } from "$env/static/private"

let apiBill = 0.0

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	const q = url.searchParams.get("q")
	if (!q) {
		throw error(400, "No query provided")
	}

	const getMovies = async (q: string) => {
		console.log("Made 3rd Party API Call")
		console.log(
			"Your monthly total is now $",
			(apiBill += 0.01).toFixed(2),
			"\n-------",
		)
		const res = await fetch(
			`https://api.themoviedb.org/3/search/movie/?api_key=${TMDB_API_KEY}&query=${q}`,
		)

		if (!res.ok) {
			throw error(res.status, "Could not fetch movies")
		}

		const movies = await res.json()
		return movies.results
	}

	return {
		movies: getMovies(q),
	}
}
