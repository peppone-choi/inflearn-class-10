import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import lodash from 'lodash';
import { tmdbInstance } from '../apis/Axios';
function SearchPage() {
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState([]);
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};
	let query = useQuery();
	const searchTerm = query.get('q');
	useEffect(() => {
		lodash.debounce(() => {
			searchTerm = query.get('q');
		}, 1000);
		fetchSearchMovie(searchTerm);
	}, [searchTerm]);

	const fetchSearchMovie = async (searchTerm) => {
		try {
			const request = await tmdbInstance.get(
				`/search/multi?include_adult=false&query=${searchTerm}`,
			);
			setSearchResults(request.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	const renderSearchResults = () => {
		return searchResults.filter(
			(movie) => movie.media_type !== 'person' && movie.backdrop_path !== null,
		).length > 0 ? (
			<section className="grid items-center grid-flow-row grid-cols-3">
				{searchResults.map((movie) => {
					if (movie.backdrop_path !== null && movie.media_type !== 'person') {
						const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
						return (
							<div key={movie.id} onClick={() => navigate(`/${movie.id}/${movie.media_type}`)}>
								<img
									className="m-32 transition-transform duration-500 ease-in-out cursor-pointer w-96 place-items-center hover:scale-105"
									src={movieImageUrl}
									alt={movie.title}
								/>
							</div>
						);
					}
				})}
			</section>
		) : (
			<section className="h-screen">
				<div className="relative inset-0 flex flex-col items-center top-1/2">
					<h2 className="mb-6 text-5xl">해당 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.</h2>
					<p>
						해당 검색어의 검색 결과가 인물이거나 영화의 backdrop이 없을 경우 검색결과에서
						제외됩니다.
					</p>
				</div>
			</section>
		);
	};

	return renderSearchResults();
}

export default SearchPage;
