import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput';
import Widget from 'src/components/widget'

import './styles/App.css';
import Stepper from 'src/components/stepper'
import Typography from 'src/components/typography';
import Button from 'src/components/button'
import Checkbox from 'src/components/form/formCheckbox'
import CheckOutlined from '@ant-design/icons/CheckOutlined'

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
      <Button color='primary' endIcon={<CheckOutlined />}>
        Button
      </Button>
    </div>
  );
}

export default App;
