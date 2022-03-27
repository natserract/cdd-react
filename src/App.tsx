import React, { useEffect, useState, useContext, createContext, useMemo } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';

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

const AppContent = styled(Widget)`
  padding: 10px 30px;
  height: 100%;
  display: flex;
`

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
        <Grid container>
          <Grid sm={10} xs={12} item>
            <h2>Back</h2>
          </Grid>
        </Grid>
      </AppContent>
    </AppContainer>
  );
}

export default App;
