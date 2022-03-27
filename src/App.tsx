import React, { useState, useMemo, useCallback, Suspense } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';
import Button from 'src/components/Button'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined'
import { useForm, FormProvider } from 'react-hook-form';
import Grid, { GridProps } from 'src/components/Grid';
import { Summary } from 'src/pieces'

// Split steps content using lazy load (optimization);
import DynModules from './DynModules'

type PickGridProps = Partial<Omit<GridProps, 'container' | 'item'>>

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
  const isLastSteps = activeStepState === DynModules.length;

  const handleNextStepState = useCallback(() => {
    setActiveStepState((prev) => prev + 1);
  }, [])

  const handleBackStepState = useCallback(() => {
    setActiveStepState((prev) => prev - 1);
  }, [])

  const handleSubmit = (async () => {
    window.console.log('submitted')
  })

  const renderStepContent = useMemo(() => {
    if (isLastSteps) return (
      <div>
        Finish
      </div>
    )

    const Component =
      DynModules[activeStepState].component as React.ComponentType<PickGridProps>

    return <Component md={8} />
  }, [activeStepState, isLastSteps])

  return (
    <AppContainer>
      <Stepper activeStep={activeStepState}>
        {DynModules.map(({ key, name }) => (
          <Step key={key}>
            <StepLabel variant='numbering'>
              {name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <AppContent fullWidth>
        <Grid container fluid>
          <Grid item>
            <Button startIcon={<ArrowLeftOutlined />} noPadding>
              Back to cart
            </Button>
          </Grid>

          <FormProvider {...form}>
            <form onSubmit={onSubmit(handleSubmit)}>
              <Suspense fallback={<div>Loading...</div>}>
                {renderStepContent}
              </Suspense>

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
