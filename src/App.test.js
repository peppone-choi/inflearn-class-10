import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

beforeEach(() => {
	localStorage.clear();
});

test('디즈니 플러스 로고가 헤더에 배치되어 있다.', () => {
	render(<App />, { wrapper: BrowserRouter });
	const logo = screen.getByTestId('disney-plus-logo');
	expect(logo).toBeInTheDocument();
});

test('로그인 정보가 없으면 랜딩 페이지가 렌더링된다.', () => {
	render(<App />, { wrapper: BrowserRouter });
	const landingPage = screen.getByTestId('disney-plus-logo-landing-page');
	expect(landingPage).toBeInTheDocument();
});

test('로그인 버튼이 존재한다', () => {
	render(<App />, { wrapper: BrowserRouter });
	const loginButton = screen.getByTestId('login-button');
	expect(loginButton).toBeInTheDocument();
});

test('로그인 정보가 있으면 네비게이션에서 프로필 이미지가 나온다.', () => {
	// Arrange
	const mockState = {
		email: 'test',
		name: 'test',
		picture: 'test',
	};
	localStorage.setItem('loginInfo', JSON.stringify(mockState));
	render(<App />, { wrapper: BrowserRouter });
	// Act
	const profileImage = screen.getByTestId('profile-picture');
	// Assert
	expect(profileImage).toBeInTheDocument();
});

test('로그인 정보가 없으면 네비게이션에서 검색창이 나오지 않는다.', () => {
	render(<App />, { wrapper: BrowserRouter });
	const searchInput = screen.queryByTestId('search-input');
	expect(searchInput).not.toHaveStyle('display: none');
});

test('로그인 정보가 있으면 네비게이션에서 검색창이 나온다.', () => {
	// Arrange
	const mockState = {
		email: 'test',
		name: 'test',
		picture: 'test',
	};
	localStorage.setItem('loginInfo', JSON.stringify(mockState));
	render(<App />, { wrapper: BrowserRouter });
	// Act
	const searchInput = screen.getByTestId('search-input');
	// Assert
	expect(searchInput).toBeInTheDocument();
});

test('로그인 정보가 있으면 메인 영화 컴포넌트가 렌더링된다.', () => {
	const mockState = {
		email: 'test',
		name: 'test',
		picture: 'test',
	};
	localStorage.setItem('loginInfo', JSON.stringify(mockState));
	// Arrange
	render(<App />, { wrapper: BrowserRouter });
	// Act
	const mainMovie = screen.getByTestId('main-movie');
	// Assert
	expect(mainMovie).toBeInTheDocument();
});
