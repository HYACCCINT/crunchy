import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import {MainPage, FormDisplay, FormUpdate} from './routes';

import './App.css';

export const App = () => (
  <Router>
    <div className='app'>
      <UrqlProvider value={urqlClient}>
        <Route path='/' component={MainPage} exact/>
        <Route path='/update-form' component={FormUpdate} exact/>
        <Route path='/formdisplay/:procedureId' component={FormDisplay} exact/>
      </UrqlProvider>
    </div>
  </Router>
)
export default App;
