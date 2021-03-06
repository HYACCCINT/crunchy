import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import {DBExample, MainPage} from './routes';
// import axios from 'axios';

import './App.css';
// let updateForm = (variables: any) : Promise<any> => new Promise(() => {});

export const App = () => (
  <Router>
    <div className='app'>
      <UrqlProvider value={urqlClient}>
        <Route path='/' component={MainPage} exact/>
        <Route path='/dbexample' component={DBExample} exact/>
      </UrqlProvider>
    </div>
  </Router>
)
export default App;
