// --- React Methods
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';

export interface UserContextState {
	address: string | undefined;
	setAddress: Dispatch<SetStateAction<string>>;
	handleConnection: (newAddres: string) => void;
	userDid: string | undefined;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	loggedIn: boolean;
	setPassportScore: Dispatch<SetStateAction<number>>;
	isVerifiedPassport: boolean | undefined;
}

const startingState: UserContextState = {
	address: undefined,
	setAddress: () => {},
	handleConnection: (newAddress: string) => {},
	userDid: undefined,
	setLoggedIn: () => {},
	loggedIn: false,
	setPassportScore: () => {},
	isVerifiedPassport: undefined,
};

// create our app context
export const UserContext = createContext(startingState);

export const UserContextProvider = ({ children }: { children: any }) => {
	const [loggedIn, setLoggedIn] = useState(false);

	const [address, setAddress] = useState<string>('');
	const [userDid, setUserDid] = useState<string | undefined>();
	const [isVerifiedPassport, setIsVerifiedPassport] = useState<boolean>(false);
	const [passportScore, setPassportScore] = useState<number>(0);

	//update passport verified status
	useEffect(() => {
		// Default score requirement set to 0.5 so user only needs one valid stamp
		if (passportScore >= 0.5) {
			console.log('updated passport score');
			setIsVerifiedPassport(true);
		} else {
			setIsVerifiedPassport(false);
		}
	}, [userDid, address, loggedIn, passportScore]);

	useEffect(() => {
		if (address) {
			setUserDid(address);
		}
	}, []);

	// Toggle connect/disconnect
	const handleConnection = async (newAddress: string) => {
		if (!newAddress) {
			setAddress('');
		} else {
			setAddress(newAddress);
		}
	};

	const stateMemo = useMemo(
		() => ({
			address,
			setAddress,
			handleConnection,
			userDid,
			setLoggedIn,
			loggedIn,
			setPassportScore,
			isVerifiedPassport,
		}),
		[address, userDid, isVerifiedPassport]
	);

	// use props as a way to pass configuration values
	const providerProps = {
		address,
		setAddress,
		handleConnection,
		userDid,
		setLoggedIn,
		loggedIn,
		setPassportScore,
		isVerifiedPassport,
	};

	return (
		<UserContext.Provider value={providerProps}>
			{children}
		</UserContext.Provider>
	);
};
