import axios from 'axios';

export const googleInstance = axios.create({
	baseURL: 'https://www.googleapis.com/oauth2/v1',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const tmdbInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: process.env.REACT_APP_TMDB_API_KEY,
		language: 'ko-KR',
		region: 'KR',
	},
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
		'Content-Type': 'application/json',
	},
});
