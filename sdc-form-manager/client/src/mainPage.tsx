import React from 'react';
import axios from 'axios';
import logo from './logo.svg';

import FormUpdate from './components/FormUpdate';

const fTitle = "test";

export const MainPage = () => {

    const hitBackend = () => {
        axios.get('/test')
          .then((response) => {
            console.log(response.data)
          }
        )
      }
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          <button onClick={hitBackend}>Send request</button>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <FormUpdate />
          </header>
        </div>
      );
};
