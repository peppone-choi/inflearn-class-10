import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { Reset } from 'styled-reset';
import InfoPage from './pages/InfoPage';

function App() {
	const loginInfo = localStorage.getItem('loginInfo')
		? JSON.parse(localStorage.getItem('loginInfo'))
		: null;

	return (
		<div className="App">
			<Reset />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={loginInfo ? <MainPage /> : <LandingPage />} />
					<Route path=":id/:type" element={<InfoPage />} />
					<Route path="search" element={<SearchPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
