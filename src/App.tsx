import React, { useEffect, useState, useContext, createContext, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';
import Button from 'src/components/Button'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined'
import { useForm, FormProvider } from 'react-hook-form';
import Grid from 'src/components/Grid';
import { Summary, DeliveryDetails } from 'src/pieces'

const steps = ['Delivery', 'Payment', 'Finish']

const AppContainer = styled.div`
  background-color: #fff9e4;
  padding: 50px; 
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AppContent = styled(Widget)(({ theme }) => ({
  padding: 30,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  [`${theme.breakpoints.down('xs')}`]: {
    padding: '20px 10px',
  }
}))

function App() {
  const form = useForm({
    mode: 'onChange'
  })
  const {
    handleSubmit: onSubmit,
  } = form

  const [activeStepState, setActiveStepState] = useState(0)
  const isLastStep = activeStepState === steps.length

  const handleNextStepState = useCallback(() => {
    setActiveStepState((prev) => prev + 1);
  }, [])

  const handleBackStepState = useCallback(() => {
    setActiveStepState((prev) => prev - 1);
  }, [])

  const handleSubmit = (async () => {
    window.console.log('submitted')
  })

  return (
    <AppContainer>
      <Stepper activeStep={activeStepState}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel variant='numbering'>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <AppContent fullWidth>
        <Grid container fluid>
          <FormProvider {...form}>
            <form onSubmit={onSubmit(handleSubmit)}>

              <Grid item>
                <Button startIcon={<ArrowLeftOutlined />} noPadding>
                  Back to cart
                </Button>
              </Grid>

              <DeliveryDetails md={8} />

              <Summary
                md={4}
                onClick={handleNextStepState}
              />
            </form>
          </FormProvider>
        </Grid>
      </AppContent>
    </AppContainer>
  );
}

export default App;
