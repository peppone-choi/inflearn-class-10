import React from 'react';
function MainMovie({ nowPlaying }) {
	return (
		<div
			style={{
				backgroundImage: `url('https://image.tmdb.org/t/p/original${nowPlaying.backdrop_path}')`,
			}}
			className={`relative w-screen bg-opacity-50 bg-cover bg-center h-[32rem]`}
			data-testid="main-movie"
		>
			<div>
				<div
					className={`w-full h-[32rem] relative bg-gradient-to-t from-black from-10% via-70% to-80%`}
				>
					<div className="absolute text-6xl font-bold top-28 left-32">{nowPlaying.title}</div>
					<div className="absolute top-48 left-32 text-md w-[38rem]">{nowPlaying.overview}</div>
				</div>
			</div>
		</div>
	);
}

export default MainMovie;
