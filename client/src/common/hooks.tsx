import { useContext } from 'react';
import { UserContext } from './user-context';

export const useAuth = () => {
	const state = useContext(UserContext);
	const isPending = state.status === 'pending';
	const isError = state.status === 'error';
	const isSuccess = state.status === 'success';
	const isAuthenticated = state.user && isSuccess;
	return {
		...state,
		isPending,
		isError,
		isSuccess,
		isAuthenticated
	};
};
