import React, { useEffect } from 'react';
import MainMovie from '../components/MainMovie';
import requests from '../apis/requests';
import Row from '../components/Row';
import { useState } from 'react';
import { tmdbInstance } from '../apis/Axios';

function MainPage() {
	const [modalClicked, setModalClicked] = useState(false);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [chosenMovie, setChosenMovie] = useState({});
	const lock = { isLocked: false };
	const getMovies = async () => {
		if (lock.isLocked) return;
		lock.isLocked = true;
		const nowPlaying = (await tmdbInstance.get(requests.fetchNowPlaying)).data.results;
		const randomIndex = Math.floor(Math.random() * nowPlaying.length);
		const randomMovie = nowPlaying[randomIndex];
		setNowPlaying(randomMovie);
		lock.isLocked = false;
	};
	useEffect(() => {
		getMovies();
	}, []);

	const handleModalClick = () => {
		setModalClicked(!modalClicked);
	};

	const handleChosenMovie = (movie) => {
		setChosenMovie(movie);
		setModalClicked(true);
	};

	console.log(nowPlaying);

	return (
		<>
			<div
				className={`${modalClicked ? '' : 'hidden'} absolute z-50 flex flex-wrap w-7/12 text-white bg-black rounded-lg shadow-lg min-h-[46em] top-32 left-1/4`}
			>
				<div
					className="relative w-full bg-opacity-50 bg-center bg-cover rounded-t-lg max-h-96 bg-gradient-to-t from-transparent to-gray-300"
					style={{
						backgroundImage: `url('https://image.tmdb.org/t/p/original${chosenMovie.backdrop_path}')`,
					}}
				>
					<button
						onClick={() => setModalClicked(false)}
						className={`absolute content-center w-8 h-8 font-black text-center bg-black rounded-full shadow right-4 top-4 hover:cursor-pointer`}
					>
						X
					</button>
				</div>
				<div className="">
					<div className="p-4 text-4xl font-bold">{chosenMovie.title}</div>
					<div className="p-4 text-lg">{chosenMovie.overview}</div>
				</div>
			</div>
			<div className="flex justify-center">
				<MainMovie nowPlaying={nowPlaying} />
			</div>
			<div className="">
				<Row
					movieFetchUri={requests.fetchTrending}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={true}
					title="Trending Now"
				/>
				<Row
					movieFetchUri={requests.fetchTopRated}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Top Rated"
				/>
				<Row
					movieFetchUri={requests.fetchActionMovies}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Action Movies"
				/>
				<Row
					movieFetchUri={requests.fetchComedyMovies}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Comedy Movies"
				/>
				<Row
					movieFetchUri={requests.fetchHorrorMovies}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Horror Movies"
				/>
				<Row
					movieFetchUri={requests.fetchRomanceMovies}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Romance Movies"
				/>
				<Row
					movieFetchUri={requests.fetchDocumentaries}
					handleModalClick={handleModalClick}
					handleChosenMovie={handleChosenMovie}
					isPoster={false}
					title="Documentaries"
				/>
			</div>
		</>
	);
}

export default MainPage;
