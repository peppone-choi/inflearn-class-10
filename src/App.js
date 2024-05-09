import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

function App() {
	const loginInfo = localStorage.getItem('loginInfo')
		? JSON.parse(localStorage.getItem('loginInfo'))
		: null;

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={loginInfo ? <MainPage /> : <LandingPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
