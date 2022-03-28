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

import Title from './Title'

const PaymentContainer = styled(Grid)(() => ({}));
const PaymentGroup = styled(Grid)(() => ({}))
const ShipmentContainer = styled(Grid)(() => ({
  marginTop: 35,

  "& > div": {
    ":not(:last-child)": {
      paddingRight: 15,
    }
  }
}))

type OutlinedButtonRootProps = {
  active?: boolean;
}
const OutlinedButtonRoot = styled(Button)<OutlinedButtonRootProps>(({ theme, active }) => ({
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
  },
}))

type OutlinedButtonProps = {
  category: string;
  price: number;
} & OutlinedButtonRootProps & ButtonProps;

const OutlinedButton: React.FC<OutlinedButtonProps> = (props) => {
  const { price, category, active, ...other } = props

  const commonButtonProps = {
    active,
    variant: 'outlined' as Any,
    endIcon: active && <CheckOutlined />
  }

  return (
    <OutlinedButtonRoot {...commonButtonProps} {...other}>
      <Grid item>
        <Typography className='category'>{category}</Typography>
        <Typography variant='h6' bolder>
          {price}
        </Typography>
      </Grid>
    </OutlinedButtonRoot>
  )
}

const paymentInputName = {
  shipmentName: 'shipmentName',
  shipmentPrice: 'shipmentPrice',
}

type PaymentProps = {}

const Payment: React.FC<PaymentProps> = (props) => {
  const { control, setValue, watch, trigger } = useFormContext()
  const { Shipment } = new Business()

  const { shipmentName, shipmentPrice } = paymentInputName
  const shimpentNameState = watch(shipmentName);
  const shimpentPriceState = watch(shipmentPrice);
  const [shipmentState, setShipmentState] = useState(shimpentNameState || Shipment.GoSend.name)

  const handleShipmentValue = useCallback(({ name, price }) => {
    setValue(shipmentName, name, {
      shouldValidate: true
    })
    setValue(shipmentPrice, price, {
      shouldValidate: true
    })
  }, [setValue, shipmentName, shipmentPrice])

  const handleClick = ({ name, price }) => {
    setShipmentState(name)
    handleShipmentValue({ name, price })
  }

  useEffect(() => {
    handleShipmentValue({
      name: shimpentNameState || Shipment.GoSend.name,
      price: shimpentPriceState || Shipment.GoSend.price
    })
  }, [Shipment.GoSend.name, Shipment.GoSend.price, handleShipmentValue, shimpentNameState, shimpentPriceState])

  return (
    <PaymentContainer item>
      <PaymentGroup item>
        <Title component='h2'>Shipment</Title>

        <ShipmentContainer item>
          {Object.values(Shipment).map(({ name, price }) => (
            <Grid key={name} md={4} item>
              <OutlinedButton
                active={name === shipmentState}
                category={name}
                price={price}
                onClick={() => handleClick({ name, price })}
              />
            </Grid>
          ))}
          <TextField control={control} name='shipmentName' hidden />
          <TextField control={control} name='shipmentPrice' hidden />
        </ShipmentContainer>
      </PaymentGroup>
    </PaymentContainer>
  )
}

export default Payment