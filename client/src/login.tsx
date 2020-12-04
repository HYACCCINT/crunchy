import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {TextInput, Button} from 'carbon-components-react';
import {UserContext} from './common/user-context';
import {  useQuery } from 'urql';
import { userQuery} from './query';

export const Login = () => {
  const history = useHistory();
  const userState = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userObj,executeQuery] = useQuery({
    query: userQuery,
    pause:true,
    variables: {id: username, password: password}
  })
  const { data, fetching, error } = userObj;
  if (!fetching && data && data.user){
    userState.setState({status: 'success',
    error: null,user:data.user}); history.push('/manage')
  }

  const userNameProps = { // make sure all required component's inputs/Props keys&types match
    id:"username",
    labelText:"User Name",
    onChange: (event:any)=>{
        setUsername(event.target.value)
    }
}
const pwdProps = { // make sure all required component's inputs/Props keys&types match
    id:"password",
    labelText:"Password",
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
const userLogin = () => {
  executeQuery()
  };
    console.log("user", userState.state);
  return (
    <div className="App">
    <div className="mainWrap">
      <div className='loginreg'>
      Login
        <TextInput {...userNameProps}/>
        <TextInput {...pwdProps}/>
        <Button id="loginbtn" kind="primary" className="menu-Button"onClick={() => { userLogin(); console.log('click');}} >Login</Button>
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