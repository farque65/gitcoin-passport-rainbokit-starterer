import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../components/nav';

const Home: NextPage = () => {
	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title> Gitcoin Passport Rainbowkit Starter </title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />

			<footer className='fixed inset-x-0 bottom-0 flex h-24 w-full items-center justify-center border-t'>
				<span className='flex items-center justify-center gap-2'>
					Powered by 🛠 🧠 🤍
				</span>
			</footer>
		</div>
	);
};

export default Home;
