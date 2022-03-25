import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput';
import Widget from 'src/components/widget'

import './styles/App.css';
import Stepper from 'src/components/stepper'
import Typography from 'src/components/typography';

import { cryptoRandomString } from './utils/random';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function App() {
  const [activeState, setActiveState] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, formState: { errors: _errors } } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    console.log('random', cryptoRandomString(5, undefined, "1I0O"))
  }, [])

  return (
    <div className="App">
      <FormInput
        control={control}
        name="name"
      />
      <Widget>
        Hello
      </Widget>

      <Stepper activeStep={activeState}>
        {steps.map((label, index) => {
          return (
            <div key={label}>
              <label htmlFor="label">{label}</label>
            </div>
          )
        })}
      </Stepper>

      <Typography color='error' gutterBottom>
        Hello
      </Typography>
    </div>
  );
}

export default App;
