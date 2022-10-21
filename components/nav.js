/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect, useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

//Context
import { UserContext } from '../context/UserContext';

export default function Nav() {
	const {
		handleConnection,
		setLoggedIn,
		setPassportScore,
		isVerifiedPassport,
		userDid,
		setAddress,
		address,
		loggedIn,
	} = useContext(UserContext);
	const [scorer, setScorer] = useState(undefined);

	useEffect(() => {
		const initScorer = async () => {
			// Dynamically load @gitcoinco/passport-sdk-verifier
			const PassportScorer = (await import('@gitcoinco/passport-sdk-scorer'))
				.PassportScorer;
			setScorer(
				new PassportScorer([
					{
						provider: 'Ens',
						issuer:
							process.env.ISSUER_DID ||
							'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC',
						score: 0.5,
					},
					{
						provider: 'Github',
						issuer:
							process.env.ISSUER_DID ||
							'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC',
						score: 0.5,
					},
					{
						provider: 'Twitter',
						issuer:
							process.env.ISSUER_DID ||
							'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC',
						score: 0.5,
					},
					{
						provider: 'Google',
						issuer:
							process.env.ISSUER_DID ||
							'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC',
						score: 0.5,
					},
					{
						provider: 'POAP',
						issuer:
							process.env.ISSUER_DID ||
							'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC',
						score: 0.5,
					},
				])
			);
		};
		initScorer().then(() => {
			console.log('Verifier inited :)');
		});
	}, []);

	// update scorer output on did or address update
	useEffect(() => {
		scorer?.getScore(address).then((result) => {
			setPassportScore(result);
			console.log('updated passport score ', result);
		});
	}, [address, userDid]);

	return (
		<>
			<div className='p-5 py-5 text-center'>
				<div className='relative flex items-center justify-between h-16'>
					<div className='hidden md:block'>
						<div className='absolute inset-y-0 right-0 flex items-center pr-2'>
							{/* Passport Verified */}
							<div className='ml-3 relative '>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://passport.gitcoin.co/'
									className='inline-flex items-center bg-gray-600 px-5 py-2 rounded-lg'
								>
									<img
										className='object-fit w-6 h-6 -ml-2.5 mr-2.5'
										src='GitcoinLogo.svg'
									/>

									<span className='text-[16px] font-medium text-white'>
										Passport {isVerifiedPassport ? '✅' : '❌'}
									</span>
								</a>
							</div>

							<div className='mx-2'>
								<ConnectButton.Custom>
									{({
										account,
										chain,
										openAccountModal,
										openChainModal,
										openConnectModal,
										mounted,
									}) => {
										return (
											<div
												{...(!mounted && {
													'aria-hidden': true,
													style: {
														opacity: 0,
														pointerEvents: 'none',
														userSelect: 'none',
													},
												})}
											>
												{(() => {
													if (account?.address) {
														handleConnection(account?.address);
													}
													if (!mounted || !account || !chain) {
														return (
															<button
																onClick={async () => {
																	openConnectModal();
																	setLoggedIn(true);
																}}
																type='button'
																className='bg-gray-600 text-white py-2 px-4 rounded-lg'
															>
																Connect Wallet
															</button>
														);
													}

													if (chain.unsupported) {
														return (
															<button
																onClick={openChainModal}
																type='button'
																className='bg-gray-600 text-white py-2 px-4 rounded-lg'
															>
																Wrong network
															</button>
														);
													}

													return (
														<div style={{ display: 'flex', gap: 12 }}>
															<button
																onClick={openChainModal}
																style={{
																	display: 'flex',
																	alignItems: 'center',
																}}
																className='bg-gray-600 py-2 px-4 rounded-lg text-white'
																type='button'
															>
																{chain.hasIcon && (
																	<div
																		style={{
																			background: chain.iconBackground,
																			width: 12,
																			height: 12,
																			borderRadius: 999,
																			overflow: 'hidden',
																			marginRight: 4,
																		}}
																	>
																		{chain.iconUrl && (
																			<img
																				alt={chain.name ?? 'Chain icon'}
																				src={chain.iconUrl}
																				style={{ width: 12, height: 12 }}
																			/>
																		)}
																	</div>
																)}
																{chain.name}
															</button>

															<button
																onClick={async () => {
																	openAccountModal();
																	setLoggedIn(false);
																	setPassportScore(0);
																	setAddress('');
																}}
																type='button'
																className='bg-gray-600 py-2 px-4 rounded-lg text-white'
															>
																{account.displayName}
																{account.displayBalance
																	? ` (${account.displayBalance})`
																	: ''}
															</button>
														</div>
													);
												})()}
											</div>
										);
									}}
								</ConnectButton.Custom>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
