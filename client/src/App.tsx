import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import {MainPage, FormDisplay, FormUpload} from './routes';
import {Header, HeaderName} from 'carbon-components-react'

import './App.css';

export const App = () => (
  <Router>
    <div className='App'>
      <UrqlProvider value={urqlClient}>
        <Header aria-label="Crunchy coders">
          <HeaderName href="#" prefix="SDC">
            [Forms]
          </HeaderName>
      </Header>
        <Route path='/' component={MainPage} exact/>
        <Route path='/upload-form/:action' component={FormUpload} exact/>
        <Route path='/formdisplay/:procedureId' component={FormDisplay} exact/>
      </UrqlProvider>
    </div>
  </Router>
)
export default App;
