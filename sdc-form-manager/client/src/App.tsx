import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import {DBExample} from './routes';
// import axios from 'axios';

import './app.css';
// let updateForm = (variables: any) : Promise<any> => new Promise(() => {});

export const App = () => (
  <Router>
    <div className='app'>
      <UrqlProvider value={urqlClient}>
        <Route path='/dbexample' component={DBExample} />
      </UrqlProvider>
    </div>
  </Router>
)
export default App;
