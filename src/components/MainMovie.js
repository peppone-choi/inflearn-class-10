import React from 'react';

function MainMovie() {
	return (
		<div
			className="relative w-11/12 overflow-hidden bg-cover bg-center bg-[url(https://loremflickr.com/3000/2000)]"
			data-testid="main-movie"
		>
			<div className="h-[32rem] bg-gradient-to-t from-black">
				<div className="absolute top-40 left-32 text-6xl font-bold">고양이는 즐거워</div>
				<div className="absolute top-60 left-32 text-md w-[38rem]">
					고양이는 즐거워는 고양이가 즐거워하는 모습을 찍은 동영상입니다. 곧 고양이 동영상이죠.
					고양이는 즐거워는 고양이가 즐거워하는 모습을 찍은 동영상입니다. 곧 고양이 동영상이죠.
					고양이는 즐거워는 고양이가 즐거워하는 모습을 찍은 동영상입니다. 곧 고양이 동영상이죠.
				</div>
			</div>
		</div>
	);
}

export default MainMovie;
