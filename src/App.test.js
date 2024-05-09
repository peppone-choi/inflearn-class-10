import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

test('디즈니 플러스 로고가 헤더에 배치되어 있다.', () => {
	render(<App />, { wrapper: BrowserRouter });
	const logo = screen.getByAltText(/disney plus logo/i);
	expect(logo).toBeInTheDocument();
});

test('로그인 정보가 없으면 랜딩 페이지가 렌더링된다.', () => {
	render(<App />, { wrapper: BrowserRouter });
	const landingPage = screen.getByText(/landing page/i);
	expect(landingPage).toBeInTheDocument();
});

test('로그인 버튼이 존재한다', () => {
	render(<App />, { wrapper: BrowserRouter });
	const loginButton = screen.getByRole('button', { name: /login/i });
	expect(loginButton).toBeInTheDocument();
});

test('로그인 정보가 있으면 랜딩 페이지가 렌더링되지 않는다.', () => {
	// Arrange
	const appRender = render(<App />, { wrapper: BrowserRouter });
	// Act

	const landingPage = screen.queryByText(/landing page/i);
	// Assert
	expect(landingPage).toBeNull();
});
