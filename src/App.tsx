import React, { useEffect, useState, useContext, createContext, useMemo } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';
import Button from 'src/components/Button'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined'

import Grid from './components/Grid';

const steps = ['Delivery', 'Payment', 'Finish']
const AppContainer = styled.div`
  background-color: #fff9e4;
  padding: 50px; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AppContent = styled(Widget)(({ theme }) => ({
  padding: 30,
  height: '100%',
  display: 'flex',

  [`${theme.breakpoints.down('xs')}`]: {
    padding: '20px 10px',
  }
}))

function App() {
  const [activeStepState, setActiveStepState] = useState(0)
  const isLastStep = activeStepState === steps.length

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
          <Grid item>
            <Button startIcon={<ArrowLeftOutlined />}>
              Back to cart
            </Button>
          </Grid>
        </Grid>
      </AppContent>
    </AppContainer>
  );
}

export default App;
