import React from 'react';
import RowItem from './RowItem';
import { useState, useEffect } from 'react';
import { tmdbInstance } from '../apis/Axios';
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
			slidesPerView={7}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
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
