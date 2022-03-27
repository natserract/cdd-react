import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/InputBase';
import Widget from 'src/components/Widget'

import './styles/App.css';
import Stepper from 'src/components/Stepper'
import Typography from 'src/components/Typography';
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import TextField from 'src/components/TextField';

import { cryptoRandomString } from './utils/random';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function Example() {
  const [activeState, setActiveState] = useState(0)
  const [checkedState, setCheckedState] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, watch, trigger, formState: { errors, ...formState }, getValues, getFieldState } = useForm({
    mode: 'onChange',
  })
  const watchFields = watch();

  useEffect(() => {
    // console.log('random', cryptoRandomString(5, undefined, "1I0O"))
  }, [watchFields])

  return (
    <div className="App">
      <br />
      <br />
      <br />

      <Checkbox
        checked={checkedState}
        color='success'
        control={control}
        label='Send as dropshipper'
        name='check'
        variant='outlined'
        onChange={(event) => setCheckedState(event.target.checked)}
      />
      <br />
      <br />

      {/* 
      <Button color='primary' size='small' startIcon={<CheckOutlined />} variant='contained'>
        Continue To Payment
      </Button> */}

      <TextField
        color='success'
        control={control}
        endAdornment={errors.name ? <CloseOutlined /> : <CheckOutlined />}
        errorMessage='Error!'
        errors={errors}
        label="Name"
        name='name'
        rules={{
          required: true
        }}
        variant='outlined'
        activeIconOnChange
        multiline
        required
      />
    </div>
  );
}

export default Example;
