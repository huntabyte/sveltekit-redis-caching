<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ movies } = data);
</script>

{#if movies.length > 0}
	<div class="movie-grid">
		{#each movies as movie}
			<article>
				<header>
					<h5>
						{movie.original_title}
					</h5>
					<p>{movie.overview.slice(0, 48) + '...'}</p>
				</header>
				<p>Released: {movie.release_date}</p>
				<p>Popularity: {movie.popularity}</p>
				<p>Vote Average: {movie.vote_average}/10</p>
			</article>
		{/each}
	</div>
{:else}
	<p>No movies found</p>
{/if}
