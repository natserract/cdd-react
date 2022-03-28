import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from 'src/components/Checkbox';
import Grid, { GridProps } from 'src/components/Grid';
import TextField from 'src/components/TextField';
import { defaultTheme } from 'src/themes/default';
import { Any } from 'src/types/share';
import styled from 'styled-components'
import Validation from 'src/static/validation';
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import { mqXsLandscape } from 'src/themes/breakpoints';
import Business from 'src/static/business'

import Title from './Title';

const DeliveryDetailsHeader = styled(Grid)`
  margin-bottom: 45px;

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
      };

      ${mqXsLandscape()} {
        padding-right: 0;
      }
    }
  }

  > div > * {
    margin-bottom: .7em;
  }
`

type DeliveryDetailsProps = {}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = () => {
  const { Regex, Rules } = Validation
  const { Dropship } = Business

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    trigger,
    unregister,
  } = useFormContext()

  const wordCounterRef = useRef(Rules.maxLenMultiline)
  const inputDropshipperRef = useRef({})

  const checkboxState = watch('check');
  const [checkedState, setCheckedState] = useState(checkboxState)

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
    setValue(
      'droshipingFee',
      isChecked ? Dropship.fee.number : 0
    )

    if (!isChecked) {
      resetInputs(fields)
    } else {
      // We need persist if has value
      // But unchecked, value stored in ref
      fields.map(v => setValue(v, inputDropshipperRef.current[v]))

      trigger(['dropshipperName', 'dropshipperPhoneNumber'])
    }
  }, [Dropship.fee.number, trigger, resetInputs, setValue])

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

  // Set default dropshipping fee
  useEffect(() => {
    if (checkboxState) {
      setValue(
        'droshipingFee',
        Dropship.fee.number,
      )
    }
  }, [Dropship.fee.number, checkboxState, setValue])

  return (
    <React.Fragment>
      <DeliveryDetailsHeader item>
        <Grid md={6} item>
          <Title component='h1'>
            Delivery Details
          </Title>
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
            required={checkboxState}
            onChange={handleChangeDropshipText}
            {...textFieldDropshipperProps('dropshipperName')}
          />

          <TextField
            disabled={!checkedState}
            label="Dropshipper Phone Number"
            maxLength={Rules.maxLen}
            name='dropshipperPhoneNumber'
            required={checkboxState}
            rules={{
              pattern: Regex.phonePattern,
            }}
            type='tel'
            onChange={handleChangeDropshipText}
            {...textFieldDropshipperProps('dropshipperPhoneNumber')}
          />
        </Grid>
      </DeliveryDetailsForm>
    </React.Fragment>
  )
}

export default DeliveryDetails