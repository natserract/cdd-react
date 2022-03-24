import React from 'react';
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput';

import logo from './assets/logo.svg';
import './styles/App.css';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, formState: { errors: _errors } } = useForm({
    mode: 'onChange'
  })


  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <FormInput
          control={control}
          name="name"
        />
      </header>
    </div>
  );
}

export default App;
