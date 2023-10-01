import React from 'react';
import Events from './components/Events';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Events/>
    </Provider>
    
  );
}

export default App;
