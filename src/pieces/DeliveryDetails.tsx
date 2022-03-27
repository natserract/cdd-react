import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from 'src/components/Checkbox';
import Grid, { GridProps } from 'src/components/Grid';
import TextField from 'src/components/TextField';
import Typography from 'src/components/Typography';
import { defaultTheme } from 'src/themes/default';
import { Any } from 'src/types/share';
import styled from 'styled-components'
import Validation from 'src/static/validation';
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'

const AppTitle = styled(Typography)`
  position: relative;
  display: inline-block;

  :after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 105%;
    height: 8px;
    background: #ececec;
    opacity: .5;
    mix-blend-mode: darken;
  }

  ${defaultTheme.breakpoints.down('xs')} {
    max-width: 200px;
  }
`

const DeliveryDetailsRoot = styled(Grid)`
  position: relative;
  padding-bottom: 5em;

  ${defaultTheme.breakpoints.up('xs')} {
    padding-right: 35px;

    :after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 1px;
      background: ${defaultTheme.palette.primary.light}
    }
  }
`
const DeliveryDetailsHeader = styled(Grid)`
  margin: 25px 0 45px;

  > div {
    height: 100%;
  };

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;

    ${defaultTheme.breakpoints.up('xs')} {
      padding-right: 30px;
    };

    ${defaultTheme.breakpoints.down('xs')} {
      justify-content: flex-start;
    }
  }
`

const DeliveryDetailsForm = styled(Grid)`
  > div {
    :first-child {
      ${defaultTheme.breakpoints.up('xs')} {
        padding-right: 20px;
      }
    }
  }

  > div > * {
    margin-bottom: .7em;
  }
`

type DeliveryDetailsProps = {} & Partial<Omit<GridProps, 'container' | 'item'>>

const DeliveryDetails: React.FC<DeliveryDetailsProps> = (props) => {
  const { onSubmit, ...other } = props
  const { Regex, Rules } = Validation

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    unregister,
  } = useFormContext()

  const wordCounterRef = useRef(120)
  const inputDropshipperRef = useRef({})

  const [checkedState, setCheckedState] = useState(false)

  const commonTextFieldProps = {
    errors,
    control,
    color: 'success' as Any,
    variant: 'outlined' as Any,
    activeIconOnChange: true,
  }
  const textFieldProps = (name: string) => ({
    ...commonTextFieldProps,
    endAdornment: errors[name] ? <CloseOutlined /> : <CheckOutlined />,
  })
  const textFieldDropshipperProps = (name: string) => ({
    ...commonTextFieldProps,
    ...(inputDropshipperRef.current[name] && checkedState && {
      endAdornment: errors[name] ? <CloseOutlined /> : <CheckOutlined />,
    }),
  })

  // Used for debug form values
  // console.log('watch', watch())

  const resetInputs = useCallback((fields: string[]) => {
    // eslint-disable-next-line array-callback-return
    fields.map(field => {
      unregister(field, {
        keepValue: false
      })
    });
  }, [unregister])

  const handleCheckedInput = useCallback((event) => {
    const isChecked = (event.target.checked)
    const fields = ['dropshipperName', 'dropshipperPhoneNumber']

    setCheckedState(isChecked)

    if (!isChecked) {
      resetInputs(fields)
    } else {
      // We need persist if has value
      // But unchecked, value stored in ref
      fields.map(v => setValue(v, inputDropshipperRef.current[v]))
    }
  }, [resetInputs, setValue])

  const handleChangeTextArea = useCallback(() => {
    const value = String(watch('address'))

    if (wordCounterRef.current >= 0) {
      wordCounterRef.current = Rules.maxLenMultiline - value.length
    }
  }, [Rules.maxLenMultiline, watch])

  const handleChangeDropshipText = useCallback((event) => {
    const name = event.target.name
    const value = event.target.value

    if (value) {
      inputDropshipperRef.current[name] = value
    } else {
      delete inputDropshipperRef.current[name]
    }
  }, [])

  return (
    <DeliveryDetailsRoot item {...other}>
      <DeliveryDetailsHeader item>
        <Grid md={6} item>
          <AppTitle color='textPrimary' component='h1' variant='h1' bolder>
            Delivery Details
          </AppTitle>
        </Grid>

        <Grid md={6} item>
          <Checkbox
            checked={checkedState}
            color='success'
            control={control}
            label='Send as dropshipper'
            name='check'
            variant='outlined'
            onChange={handleCheckedInput}
          />
        </Grid>
      </DeliveryDetailsHeader>

      <DeliveryDetailsForm item>
        <Grid md={7} sx={{
          [`${defaultTheme.breakpoints.down('xs')}`]: {
            marginBottom: 40,
          }
        }} item>
          <TextField
            label="Email"
            name='email'
            rules={{
              pattern: Regex.emailPattern,
            }}
            type='email'
            required
            {...textFieldProps('email')}
          />

          <TextField
            label="Phone Number"
            maxLength={Rules.maxLen}
            name='phone'
            rules={{
              pattern: Regex.phonePattern,
            }}
            type='tel'
            required
            {...textFieldProps('phone')}
          />

          <TextField
            helperText={`(${wordCounterRef.current}/120)`}
            label="Delivery Address"
            maxLength={Rules.maxLenMultiline}
            name='address'
            multiline
            required
            onChange={handleChangeTextArea}
            {...textFieldProps('address')}
          />
        </Grid>
        <Grid md={5} item>
          <TextField
            disabled={!checkedState}
            label="Dropshipper Name"
            name='dropshipperName'
            required={checkedState}
            onChange={handleChangeDropshipText}
            {...textFieldDropshipperProps('dropshipperName')}
          />

          <TextField
            disabled={!checkedState}
            label="Dropshipper Phone Number"
            maxLength={Rules.maxLen}
            name='dropshipperPhoneNumber'
            required={checkedState}
            rules={{
              pattern: Regex.phonePattern,
            }}
            type='tel'
            onChange={handleChangeDropshipText}
            {...textFieldDropshipperProps('dropshipperPhoneNumber')}
          />
        </Grid>
      </DeliveryDetailsForm>
    </DeliveryDetailsRoot>
  )
}

export default DeliveryDetails