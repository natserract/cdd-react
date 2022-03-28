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
import { defaultTheme } from './themes/default';
import { Any } from './types/share';
import { usePersistForm } from './hooks/usePersistForm';
import Config from './static/config';
import { getItem } from './utils/storage';

type PickGridProps = Partial<Omit<GridProps, 'container' | 'item'>>

const AppContainer = styled.div`
  background-color: #fff9e4;
  padding: 50px; 
  display: flex;
  flex-direction: column;
  align-items: center;

  ${defaultTheme.breakpoints.down('xs')} {
    padding: 20px;
  }
`
const AppContent = styled(Widget)(({ theme }) => ({
  padding: 30,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,

  [`${theme.breakpoints.down('xs')}`]: {
    padding: '20px 10px',
  }
}))

const Form = styled('form')`
  > * {
    min-height: 280px;

    ${defaultTheme.breakpoints.up('sm')} {
      min-height: 500px;
    }
  }
`

function App() {
  const { FormDataKey } = Config;

  const formDataPersist = getItem(FormDataKey)
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      ...formDataPersist,
    }
  })
  const {
    watch,
    handleSubmit: onSubmit,
  } = form

  // getValues periodically retrieves the form data
  usePersistForm({ value: watch(), localStorageKey: FormDataKey });

  const checkBoxState = useState(formDataPersist?.check)
  const [activeStepState, setActiveStepState] = useState(0)
  const isLastSteps = (activeStepState + 1) === DynModules.length;

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

    // Be careful, type safe no guarantee
    const Component =
      DynModules[activeStepState].component as React.ComponentType<PickGridProps & {
        [k: string]: Any;
      }>

    return <Component checkBoxState={checkBoxState} md={8} />
  }, [activeStepState, checkBoxState, isLastSteps])

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
            <Form onSubmit={onSubmit(handleSubmit)}>
              <Suspense fallback={<div>Loading...</div>}>
                {renderStepContent}
              </Suspense>

              <Summary
                checkBoxState={checkBoxState}
                md={4}
                onClick={handleNextStepState}
              />
            </Form>
          </FormProvider>
        </Grid>
      </AppContent>
    </AppContainer>
  );
}

export default App;
