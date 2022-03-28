import styled from 'styled-components'
import Grid from 'src/components/Grid'
import { useFormContext } from 'react-hook-form';
import { Any } from 'src/types/share';
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import Business from 'src/static/business';
import Button, { ButtonProps } from 'src/components/Button'
import Typography from 'src/components/Typography';
import colorAlpha from 'color-alpha';
import { useCallback, useEffect, useState } from 'react';
import TextField from 'src/components/TextField';
import { formatMoney } from 'src/utils/format';

import Title from './Title'

const PaymentContainer = styled(Grid)(() => ({}));
const PaymentGroup = styled(Grid)(() => ({}))
const PaymentItem = styled(Grid)(() => ({
  marginTop: 35,

  "& > div": {
    ":not(:last-child)": {
      paddingRight: 15,
    }
  }
}))

type OutlinedButtonRootProps = {
  active?: boolean;
  hasPrice?: boolean;
}
const OutlinedButtonRoot = styled(Button)<OutlinedButtonRootProps>(({ theme, active, hasPrice }) => ({
  width: '100%',
  height: 75,

  "& > div": {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  "& > span:last-child": {
    color: theme.palette.success.main,
  },

  ...(active && {
    borderColor: theme.palette.success.main,
    borderWidth: 3,
    background: colorAlpha(theme.palette.success.main, .12)
  }),

  "& .category": {
    fontSize: 14,
    marginBottom: 3,

    ...(hasPrice && {
      fontSize: 18,
    })
  },
}))

type OutlinedButtonProps = {
  category: string;
  price?: number;
} & OutlinedButtonRootProps & ButtonProps;

const OutlinedButton: React.FC<OutlinedButtonProps> = (props) => {
  const { price, category, active, ...other } = props

  const commonButtonProps = {
    active,
    variant: 'outlined' as Any,
    endIcon: active && <CheckOutlined />
  }

  return (
    <OutlinedButtonRoot
      hasPrice={!price}
      {...commonButtonProps}
      {...other}
    >
      <Grid item>
        <Typography className='category'>{category}</Typography>

        {price && <Typography variant='h6' bolder>
          {formatMoney(price)}
        </Typography>
        }
      </Grid>
    </OutlinedButtonRoot>
  )
}

const paymentInputName = {
  shipmentName: 'shipmentName',
  shipmentPrice: 'shipmentPrice',
  paymentMethod: 'paymentMethod'
}

const eWalletSaldo = 1500000

type PaymentProps = {}

const Payment: React.FC<PaymentProps> = () => {
  const { control, setValue, watch, getValues } = useFormContext()
  const { Shipment, Payment } = Business;

  const { shipmentName, shipmentPrice, paymentMethod } = paymentInputName
  const shimpentNameState = watch(shipmentName) || Shipment.GoSend.name;
  const paymentMethodState = watch(paymentMethod) || Payment[0];

  const [shipmentState, setShipmentState] = useState(shimpentNameState || Shipment.GoSend.name)
  const [paymentState, setPaymentState] = useState(paymentMethodState || Payment[0])

  const handleShipmentValue = useCallback(({ name, price }) => {
    setValue(shipmentName, name, {
      shouldValidate: true
    })
    setValue(shipmentPrice, price, {
      shouldValidate: true
    })
  }, [setValue, shipmentName, shipmentPrice])

  const handlePaymentValue = useCallback(({ name }) => {
    setValue(paymentMethod, name, {
      shouldValidate: true
    })
  }, [paymentMethod, setValue])

  const handleClickShipment = ({ name, price }) => {
    setShipmentState(name)
    handleShipmentValue({ name, price })
  }

  const handleClickPayment = (name) => {
    setPaymentState(name)
    handlePaymentValue({ name })
  }

  // Setting default value persisted

  useEffect(() => {
    // handleShipmentValue({
    //   name: shimpentNameState || Shipment.GoSend.name,
    //   price: shimpentPriceState || Shipment.GoSend.price
    // });

    // handlePaymentValue({
    //   name: paymentMethodState || Payment[0]
    // })
  }, [shimpentNameState])

  return (
    <PaymentContainer item>
      <PaymentGroup item>

        <Grid item>
          <Title component='h2'>Shipment</Title>

          <PaymentItem item>
            {Object.values(Shipment).map(({ name, price }) => (
              <Grid key={name} md={4} item>
                <OutlinedButton
                  active={name === shipmentState}
                  category={name}
                  price={price}
                  onClick={() => handleClickShipment({ name, price })}
                />
              </Grid>
            ))}
            <TextField control={control} name={shipmentName} hidden />
            <TextField control={control} name={shipmentPrice} hidden />
          </PaymentItem>
        </Grid>

        <Grid item>
          <Title component='h2'>Payment</Title>

          <PaymentItem item>
            {Object.values(Payment).map((payment) => (
              <Grid key={payment} md={4} item>
                <OutlinedButton
                  active={payment === paymentState}
                  category={payment}
                  price={payment === 'e-Wallet' && eWalletSaldo}
                  onClick={() => handleClickPayment(payment)}
                />
              </Grid>
            ))}
            <TextField control={control} name={paymentMethod} hidden />
          </PaymentItem>
        </Grid>

      </PaymentGroup>
    </PaymentContainer>
  )
}

export default Payment