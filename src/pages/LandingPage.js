import React from 'react';

function LandingPage() {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
					alt="disney plus logo"
					className="w-96 h-96 p-3 cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out"
				/>
			</div>
		</div>
	);
}

export default LandingPage;
