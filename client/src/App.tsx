import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import {MainPage, FormDisplay, FormUpload, Login} from './routes';

import './App.css';
import withAuth from './WithAuth';

export const App = () => (
  <Router>
    <div className='app'>
      <UrqlProvider value={urqlClient}>
        <Route path='/' component={withAuth(MainPage)} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/upload-form/:action' component={withAuth(FormUpload)} exact/>
        <Route path='/formdisplay/:procedureId' component={withAuth(FormDisplay)} exact/>
      </UrqlProvider>
    </div>
  </Router>
)
export default App;
