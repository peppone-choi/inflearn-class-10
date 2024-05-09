import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { googleInstance } from '../apis/Axios';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import lodash from 'lodash';

function Navigation({ isScrolled }) {
	const [logoutClicked, setLogoutClicked] = useState(false);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	const loginInfo = localStorage.getItem('loginInfo')
		? JSON.parse(localStorage.getItem('loginInfo'))
		: null;

	const handleGoogleLogout = async () => {
		googleLogout();
		localStorage.removeItem('loginInfo');
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
				className={`fixed w-full h-16 items-center flex justify-between z-50 top-0 bg-black bg-opacity-55 ${isScrolled && 'bg-opacity-30'}`}
			>
				<img
					data-testid="disney-plus-logo"
					className="w-28 h-28 p-3 cursor-pointer"
					src="https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
					alt="disney plus logo"
					onClick={() => navigate('/')}
				/>
				<div className="flex items-center">
					<input
						data-testid="search-input"
						type="text"
						className={`${!loginInfo && 'hidden'} bg-transparent border border-2 text-center border-gray-400 rounded-md p-1 w-96 h-8 text-white placeholder-gray-400`}
						placeholder="검색"
						value={search}
						onChange={(e) => lodash.clamp(setSearch(e.target.value))}
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
								className="size-10 rounded-full m-6 cursor-pointer shadow-md hover:shadow-lg"
								onClick={() => setLogoutClicked(!logoutClicked)}
							/>
						</div>
					) : (
						<div
							data-testid="login-button"
							className="cursor-pointer m-4 p-2 bg-slate-800 rounded-md shadow-md hover:bg-slate-600 hover:shadow-lg"
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
