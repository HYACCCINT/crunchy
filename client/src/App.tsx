import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import { UserContextProvider } from './common/user-context';
import {MainPage, FormDisplay, FormUpload, FormFill, DashBoard, ErrorBoundary} from './routes';
import {Header, HeaderName} from 'carbon-components-react'

import './App.css';

export const App = () => (
  <Router>
    <ErrorBoundary>
      <UserContextProvider>
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
            <Route path='/formfill/:formID' component={FormFill} exact/>
            <Route path='/dashboard' component={DashBoard} exact/>
          </UrqlProvider>
        </div>
      </UserContextProvider>
    </ErrorBoundary>
  </Router>
)
export default App;
