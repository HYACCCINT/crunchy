import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const history = useHistory();
    const [authFields, setAuthFields] = useState<{ email: string, password: string }>({email: '', password: ''});

    const handleInputChange = (event: any) => {
        const { value, name } = event.target;
        let newFields: {email: string, password: string} = { ...authFields };
        if(name === 'email') {
            newFields.email = value;
        }
        if(name === 'password'){
            newFields.password = value;
        }
        setAuthFields(newFields);
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        axios.post('/authenticate', authFields)
        .then((res: any) => {
            if (res.status === 200) {
                history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Login Below!</h1>
            <br></br>
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={authFields.email}
                onChange={handleInputChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={authFields.password}
                onChange={handleInputChange}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    );
}
