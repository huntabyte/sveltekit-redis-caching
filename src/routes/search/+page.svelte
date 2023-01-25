<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ movies } = data);
</script>

{#if movies.length > 0}
	<h4>Search results</h4>
	<div class="grid">
		<div>
			{#each movies as movie}
				<article>
					<header>
						<a href={movie['#IMDBURL']}>
							{movie['#TITLE']}
						</a>
					</header>
					<p>Year: {movie['#YEAR']}</p>
					<p>Rank: {movie['#RANK']}</p>
					<p>Actors: {movie['#ACTORS']}</p>
				</article>
			{/each}
		</div>
		<div />
		<div />
	</div>
{:else}
	<p>No movies found</p>
{/if}
