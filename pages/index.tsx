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

			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				<h1 className='text-6xl font-bold'>
					Welcome to{' '}
					<a className='text-green-600' href='https://nextjs.org'>
						Rainbowkit + Passport-SDK !
					</a>
				</h1>

				<p className='mt-3 text-2xl'>
					Get started by editing{' '}
					<code className='rounded-md bg-gray-100 p-3 font-mono text-lg'>
						pages/index.tsx
					</code>
				</p>

				<div className='mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full'>
					<a
						href='https://docs.passport.gitcoin.co/gitcoin-passport-sdk/getting-started'
						target='_blank'
						rel='noopener noreferrer'
						className='mt-6 w-96 rounded-xl border p-6 text-left hover:text-green-600 focus:text-green-600'
					>
						<h3 className='text-2xl font-bold'>Documentation &rarr;</h3>
						<p className='mt-4 text-xl'>
							Find in-depth information about Passport-SDK features and its API.
						</p>
					</a>

					<a
						href='https://github.com/gitcoinco/passport-sdk/tree/main/examples'
						target='_blank'
						rel='noopener noreferrer'
						className='mt-6 w-96 rounded-xl border p-6 text-left hover:text-green-600 focus:text-green-600'
					>
						<h3 className='text-2xl font-bold'>Examples &rarr;</h3>
						<p className='mt-4 text-xl'>
							Discover and deploy boilerplate example Passport-SDK projects.
						</p>
					</a>
				</div>
			</main>

			<footer className='fixed inset-x-0 bottom-0 flex h-24 w-full items-center justify-center border-t'>
				<span className='flex items-center justify-center gap-2'>
					Powered by Gitcoin
				</span>
			</footer>
		</div>
	);
};

export default Home;
