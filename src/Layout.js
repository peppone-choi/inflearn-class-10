import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useState } from 'react';
import lodash from 'lodash';
export default function Layout() {
	return (
		<div className="text-white bg-black">
			<Navigation />
			<Outlet />
			<Footer />
		</div>
	);
}
