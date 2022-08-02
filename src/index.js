import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import '@aws-amplify/ui-react/styles.css';

import Amplify from 'aws-amplify'
import config from './aws-exports'
import { AmplifyProvider } from '@aws-amplify/ui-react'

Amplify.configure(config)



ReactDOM.render(
  <AmplifyProvider>
     <App />,
  </AmplifyProvider>,
  document.getElementById('root')
);
