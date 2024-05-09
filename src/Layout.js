import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useState } from 'react';
import lodash from 'lodash';
export default function Layout() {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				console.log('scrolled');
				setIsScrolled(true);
			} else {
				console.log('not scrolled');
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			lodash.throttle(() => window.removeEventListener('scroll', handleScroll), 1000);
		};
	}, []);
	return (
		<div className="w-screen h-screen bg-black text-white">
			<Navigation isScrolled={isScrolled} />
			<Outlet />
			<Footer />
		</div>
	);
}
