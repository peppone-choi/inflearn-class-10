import React from 'react';
import RowItem from './RowItem';
import { useState, useEffect } from 'react';
import { tmdbInstance } from '../apis/Axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

function Row({ movieFetchUri, title, isPoster, handleModalClick, handleChosenMovie }) {
	const [movieData, setMovieData] = useState([]);
	const moviefetch = async (movieFetch) => {
		const movieData = await tmdbInstance.get(movieFetch);
		setMovieData(movieData.data.results);
	};
	useEffect(() => {
		moviefetch(movieFetchUri);
	}, []);
	return (
		<Swiper
			spaceBetween={50}
			loop={true}
			breakpoints={{
				0: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				},
				625: {
					slidesPerView: 4,
					slidesPerGroup: 4,
				},
				998: {
					slidesPerView: 5,
					slidesPerGroup: 5,
				},
				1378: {
					slidesPerView: 6,
					slidesPerGroup: 6,
				},
			}}
		>
			<div className="m-4 text-3xl">{title}</div>
			<div className="flex">
				{movieData.map((movie) => (
					<SwiperSlide>
						<RowItem
							movieItem={movie}
							isPoster={isPoster}
							handleModalClick={handleModalClick}
							handleChosenMovie={handleChosenMovie}
						/>
					</SwiperSlide>
				))}
			</div>
		</Swiper>
	);
}

export default Row;
