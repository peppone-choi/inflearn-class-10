import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { googleInstance } from '../apis/Axios';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import lodash from 'lodash';

function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [logoutClicked, setLogoutClicked] = useState(false);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	let loginInfo = localStorage.getItem('loginInfo')
		? JSON.parse(localStorage.getItem('loginInfo'))
		: null;

	const handleChange = (e) => {
		setSearch(e.target.value);
		navigate(`/search?q=${e.target.value}`);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			lodash.throttle(() => window.removeEventListener('scroll', handleScroll), 1000);
		};
	}, []);

	const handleGoogleLogout = async () => {
		googleLogout();
		localStorage.removeItem('loginInfo');
		setLogoutClicked(false);
		loginInfo = null;
		navigate(0);
	};

	const googleLogin = (res) => {
		const { email, name, picture } = jwtDecode(res.credential);
		localStorage.setItem('loginInfo', JSON.stringify({ email, name, picture }));
		navigate(0);
	};

	return (
		<div data-testid="navigation-component">
			<div
				className={`fixed w-full h-16 items-center flex justify-between z-50 top-0 bg-black ${isScrolled ? 'bg-opacity-100' : 'bg-opacity-20'}`}
			>
				<img
					data-testid="disney-plus-logo"
					className="p-3 cursor-pointer w-28 h-28"
					src="https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
					alt="disney plus logo"
					onClick={() => navigate('/')}
				/>
				<div className="flex items-center">
					<input
						data-testid="search-input"
						type="text"
						className={`${!loginInfo && 'hidden'} bg-transparent border-2 text-center border-gray-400 rounded-md p-1 w-96 h-8 text-white placeholder-gray-400`}
						placeholder="검색"
						value={search}
						onChange={handleChange}
					/>
				</div>
				<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
					<div className="hidden">
						<GoogleLogin
							className="google-login-button"
							clientId={clientId}
							onSuccess={(res) => {
								googleLogin(res);
							}}
						/>
					</div>
				</GoogleOAuthProvider>
				<div
					onClick={handleGoogleLogout}
					className={`absolute opacity-70 p-3 right-4 top-8 bg-slate-800 shadow-md hover:shadow-lg ${!logoutClicked && 'hidden'} cursor-pointer`}
				>
					Logout
				</div>
				<div>
					{loginInfo ? (
						<div>
							<img
								data-testid="profile-picture"
								src={loginInfo.picture}
								alt={loginInfo.name}
								className="m-6 rounded-full shadow-md cursor-pointer size-10 hover:shadow-lg"
								onClick={() => setLogoutClicked(!logoutClicked)}
							/>
						</div>
					) : (
						<div
							data-testid="login-button"
							className="p-2 m-4 rounded-md shadow-md cursor-pointer bg-slate-800 hover:bg-slate-600 hover:shadow-lg"
							onClick={() => {
								const login = document.querySelector('[aria-labelledby="button-label"]');
								login.click();
							}}
						>
							로그인
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
