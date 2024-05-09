import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const loginInfoInit = localStorage.getItem('loginInfo')
	? JSON.parse(localStorage.getItem('loginInfo'))
	: null;

function App() {
	const navigator = useNavigate();
	const [loginInfo, setLoginInfo] = useState(loginInfoInit);

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
