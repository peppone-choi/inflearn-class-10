import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div>
				<img
					data-testid="disney-plus-logo-landing-page"
					src="https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
					alt="disney plus logo"
					className="p-3 transition-transform duration-500 ease-in-out cursor-pointer w-96 h-96 hover:scale-110"
					onClick={() => navigate('/')}
				/>
			</div>
		</div>
	);
}

export default LandingPage;
