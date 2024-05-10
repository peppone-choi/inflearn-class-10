import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbInstance } from '../apis/Axios';

function InfoPage() {
	const { id, type } = useParams();
	const [movieData, setMovieData] = useState({});
	const getMovieInfo = async (id) => {
		const movieInfo = await tmdbInstance.get(`/${type}/${id}`, {
			params: {
				language: 'ko-KR',
			},
		});
		setMovieData(movieInfo.data);
	};

	useEffect(() => {
		getMovieInfo(id);
	}, []);

	return (
		<div className="h-screen bg-black">
			<div
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
				}}
				className="relative w-screen bg-cover bg-center h-[32rem]"
			>
				<div className="relative w-screen bg-cover bg-center h-[32rem]">
					<div className="absolute text-6xl font-bold top-28 left-32">
						{movieData.name
							? movieData.name
							: movieData.title
								? movieData.title
								: movieData.original_name}
					</div>
					<div className="absolute top-48 left-32 text-md w-[38rem]">{movieData.overview}</div>
				</div>
			</div>
		</div>
	);
}

export default InfoPage;
