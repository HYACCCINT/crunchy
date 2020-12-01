import React, { useState,useContext } from 'react';
import { Route, useHistory} from 'react-router-dom';
import { Button, Modal } from 'carbon-components-react';
import { useAuth } from './hooks';
import { UserContext } from './user-context';


export const validUrl = (url: string | null) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
		+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' // domain name
		+ '((\\d{1,3}\\.){3}\\d{1,3}))' // ip (v4) address
		+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port
		+ '(\\?[;&amp;a-z\\d%_.~+=-]*)?' // query string
		+ '(\\#[-a-z\\d_]*)?$','i');

	if (!url || !pattern.test(url)) {
		return '';
	}

	return url;
};


export const ProtectedRoute = ({
	component: Component,
	isAuthenticated,
	noAuthComponent,
	...rest
}: any) => {
	const value = useContext(UserContext);
	const history = useHistory();
	let auth = useAuth();
    const getUser = () => fetch(`http://localhost:5000/api/guest-login`)
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
        }
        response.json().then((res:any)=>{ value.setState({status: 'success',
		error: null,user:res.user}); return res;})
	});
console.log(value,"????");
	let NoAuthComponent = () => {
		window.localStorage.setItem('redirectUrl', window.location.href);
		return (
			<div >
				<div >
					<h1>SDC Forms</h1>
					<p style={{ marginTop: '0.5em' }}>Crunchy coders</p>
					<Button
						// disabled
						style={{
							marginTop: '2em',
							marginBottom: '1em'
						}}
						href={`localhost:3000/login`}>
						Log in to get started
					</Button>
					<Button
						onClick={() => { getUser() }}>
						Log in as guest
					</Button>
				</div>
			</div>
		);
	};

	if (noAuthComponent) {
		NoAuthComponent = noAuthComponent;
	}
console.log(rest, "Dfdsfsdfsdf");
	return <Route {...rest} render={(props) => (
		isAuthenticated
			? isAuthenticated({ auth })
				? <Component {...props} {...rest} />
				: <NoAuthComponent />
			: auth.user
				? <Component {...props} {...rest} />
				: <NoAuthComponent />
	)} />;
};
