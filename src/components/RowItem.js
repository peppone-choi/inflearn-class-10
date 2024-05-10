import React from 'react';

function RowItem({ movieItem, isPoster, handleModalClick, handleChosenMovie }) {
	return (
		<div>
			<img
				src={`https://image.tmdb.org/t/p/original${isPoster ? movieItem.poster_path : movieItem.backdrop_path}`}
				alt={movieItem.title}
				className="transition-transform duration-500 ease-in-out cursor-pointer rounded-2xl hover:scale-105"
				onClick={() => {
					handleChosenMovie(movieItem);
					handleModalClick();
				}}
			/>
		</div>
	);
}

export default RowItem;
