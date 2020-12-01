import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {TextInput, Button} from 'carbon-components-react';
import {UserContext} from './common/user-context';

export const Login = () => {
  const history = useHistory();
  const userState = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [permissions, setPermissions] = useState({manage:false, fill:false});

  const userNameProps = { // make sure all required component's inputs/Props keys&types match
    id:"username",
    labelText:"User Name",
    onChange: (event:any)=>{
        setUsername(event.target.value)
    }
}
const pwdProps = { // make sure all required component's inputs/Props keys&types match
    id:"username",
    labelText:"User Name",
    onChange: (event:any)=>{
        setPassword(event.target.value)
    }
}    
const guestLogin = (type: string) => fetch(`http://localhost:5000/api/${type}-guest-login`)
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
        }
        response.json().then((res:any)=>{ userState.setState({status: 'success',
		error: null,user:res.user}); history.push(res.url);return res;})
	});
  return (
    <div className="App">
    <div className="mainWrap">
      <div className='loginreg'>
        <TextInput {...userNameProps}/>
        <TextInput {...pwdProps}/>
        <Button id="loginbtn" kind="primary" className="menu-Button" >Login</Button>
        <Button id="regbtn" kind="secondary" className="menu-Button">Sign Up</Button>
      </div>
      <div className="guest">
      Or...
      <Button
            onClick={() => { guestLogin('filler') }}>
            Log in as Filler guest
    </Button>
    <Button
        onClick={() => { guestLogin('manager') }}>
        Log in as Manager guest
    </Button>    
      </div>
      </div>
    </div>
  );
};

function validateId(procedureId: string | null) {
  return procedureId !== null && procedureId !== "";
}