import React, { useEffect, useState, useContext, createContext, useMemo } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper, { StepperContext } from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';
import LeftOutlined from '@ant-design/icons/LeftOutlined';

const steps = ['Delivery', 'Payment', 'Finish']
const AppContainer = styled.div`
  background-color: #fff9e4;
  padding: 50px; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

      <Widget sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }} fullWidth>
        <h2>Back</h2>
      </Widget>
    </AppContainer>
  );
}

export default App;
