import Grid from 'src/components/Grid';
import Typography from 'src/components/Typography';
import { defaultTheme } from 'src/themes/default';
import Button from 'src/components/Button'
import { formatMoney } from 'src/utils/format';
import { useFormContext } from 'react-hook-form';
import React, { useCallback } from 'react';
import Business, { getShipmentData } from 'src/static/business';
import { isLastStep } from 'src/utils/step';
import { Any } from 'src/types/share';

const totalPrice = (values: { [k: string]: Any }) => {
  return Object.values(values).reduce((acc, curr) => acc + curr)
}

const shipmentEstimate = (getValues) => {
  const { Shipment } = Business;
  const defaultValue = Shipment.GoSend.name

  return `
      ${getShipmentData(getValues('shipmentName') || defaultValue).estimate} by 
      ${getValues('shipmentName') || defaultValue}
    `
}

const SxItemSummaryContainer = {
  "& > div:not(:last-child)": {
    display: 'flex',
    marginBottom: 10,
  }
}
const SxItemSummaryText = {
  "& > div:last-child": {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}

const SxItemSummaryTotal = {
  margin: '7px 0 25px',
  display: 'flex',

  [`${defaultTheme.breakpoints.down('xs')}`]: {
    marginBottom: 30,
  }
}

const SxItemPayment = {
  position: 'relative',
  margin: '30px 0 0',
  padding: '20px 0 0',

  "&:before": {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    width: 100,
    background: '#cacaca',
  }
}

type SummaryProps = {
  stepState: [number, React.Dispatch<React.SetStateAction<number>>];
}

const Summary: React.FC<SummaryProps> = (props) => {
  const { stepState } = props
  const { Dropship, Payment, } = Business

  const { watch, formState: { errors, isValid }, getValues } = useFormContext()

  const isFormValid = !Object.entries(errors).length && isValid
  const checkedState = watch('check');

  const [activeStepState, setActiveStepState] = stepState
  const lastStep = isLastStep(activeStepState)

  const handleNextStepState = useCallback(() => {
    setActiveStepState((prev) => prev + 1);
  }, [setActiveStepState])

  const getTotalPrice = {
    costOfGoods: getValues('costOfGoods') || 0,
    droshipingFee: getValues('droshipingFee') || 0,
    shipmentPrice: getValues('shipmentPrice') || 0,
  }

  return (
    <React.Fragment>
      <Grid sx={{ paddingBottom: 30 }} item>
        <Typography color='textPrimary' component='h2' variant='h2' bolder>
          Summary

          <Typography sx={{ display: 'block', marginTop: 13 }}>
            10 items purchased
          </Typography>
        </Typography>

        {/* Delivery Estimation */}
        {Boolean(watch('shipmentName')) && (
          <Grid sx={SxItemPayment} item>
            <Grid item>
              <Typography sx={{ marginBottom: '5px', display: 'block' }}>
                Delivery Estimation
              </Typography>
            </Grid>
            <Grid item>
              <Typography color='success' variant='h6' bolder>
                {shipmentEstimate(getValues)}
              </Typography>
            </Grid>
          </Grid>
        )}
        {/* End Delivery Estimation */}

        {Boolean(watch('paymentMethod')) && (
          <Grid sx={SxItemPayment} item>
            <Grid item>
              <Typography sx={{ marginBottom: '5px', display: 'block' }}>
                Payment Method
              </Typography>
            </Grid>
            <Grid item>
              <Typography color='success' variant='h6' bolder>
                {getValues('paymentMethod') || Payment[0]}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid item>
        <Grid sx={SxItemSummaryContainer} item>

          {/* Cost of goods */}
          <Grid sx={SxItemSummaryText} item>
            <Grid md={6} sm={6} xs={6} item>
              Cost of goods
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography bolder>500,000</Typography>
            </Grid>
          </Grid>
          {/* End Cost of goods */}

          {/* Dropshiping fee */}
          {checkedState && (
            <Grid sx={SxItemSummaryText} item>
              <Grid md={6} sm={6} xs={6} item>
                Dropshiping Fee
              </Grid>
              <Grid md={6} sm={6} xs={6} item>
                <Typography bolder>{formatMoney(Dropship.fee.number)}</Typography>
              </Grid>
            </Grid>
          )}
          {/* End Dropshiping fee */}

          {Boolean(watch('shipmentName')) && <Grid sx={SxItemSummaryText} item>
            <Grid md={6} sm={6} xs={6} item>
              Go Send Shipment
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography bolder>
                {formatMoney(watch('shipmentPrice') || 0)}
              </Typography>
            </Grid>
          </Grid>
          }

          {/* Total */}
          <Grid sx={{ ...SxItemSummaryText, ...SxItemSummaryTotal }} item>
            <Grid md={6} sm={6} xs={6} item>
              <Typography color='textPrimary' variant='h3' bolder>Total</Typography>
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography color='textPrimary' variant='h3' bolder>
                {formatMoney(
                  totalPrice({ ...getTotalPrice })
                )}
              </Typography>
            </Grid>
          </Grid>
          {/* End Total */}
        </Grid>

        {/* Action */}
        {!lastStep && <Button
          color='primary'
          disabled={!isFormValid}
          size='large'
          variant='contained'
          fullWidth
          onClick={handleNextStepState}
        >
          Continue To Payment
        </Button>}
        {/* End Action */}
      </Grid>
    </React.Fragment>
  )
}

export default Summary