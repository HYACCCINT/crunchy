import React, {
	createContext,
	useState,
	useEffect
} from 'react';

const UserContext: React.Context<any> = createContext({});

UserContext.displayName = 'UserContext';

const getUser = () => fetch(`http://localhost:5000/api/cur-user`, { credentials : 'same-origin' })
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		console.log("!!!!!!!");
		return response.json();
	});

const UserContextProvider = ({ children }: any) => {
	const [state, setState] = useState({
		status: 'pending',
		error: null,
		user: null
	});

	useEffect(() => {
		getUser().then(
			(user) => setState({
				status: 'success',
				error: null,
				user
			} as any)
		).catch(
			(error) => setState({
				status: 'error',
				error,
				user: null
			} as any)
		);
	}, []);

	return (
		<UserContext.Provider value={{state:state, setState:setState}}>
			{ children }
		</UserContext.Provider>
	);
};


export {
	UserContext,
	UserContextProvider
};
