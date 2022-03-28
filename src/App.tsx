import React, { useState, useMemo, useCallback, Suspense } from 'react';
import styled from 'styled-components'
import Widget from 'src/components/Widget'
import Stepper from 'src/components/Stepper'
import Step from 'src/components/Step';
import StepLabel from 'src/components/StepLabel';
import Button from 'src/components/Button'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined'
import { useForm, FormProvider } from 'react-hook-form';
import Grid from 'src/components/Grid';
import { Summary } from 'src/pieces'

import DynModules from './DynModules'
import { defaultTheme } from './themes/default';
import { Any } from './types/share';
import { usePersistForm } from './hooks/usePersistForm';
import Config from './static/config';
import { getItem } from './utils/storage';
import { mqXsLandscape } from './themes/breakpoints';
import Business from './static/business';

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

const AsideLeft = styled(Grid)`
  position: relative;
  padding-top: 25px;
  padding-bottom: 2em;

  ${defaultTheme.breakpoints.up('xs')} {
    padding-right: 35px;
    padding-bottom: 5em;

    :after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 1px;
      background: ${defaultTheme.palette.primary.light}
    }
  }

  ${mqXsLandscape()} {
    padding-right: 0px;
    padding-bottom: 1em;

    :after {
      display: none;
    }
  }
`

const AsideRight = styled(Grid)`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${defaultTheme.breakpoints.up('xs')} {
    padding: 20px 0 0 25px;
  };

  ${mqXsLandscape()} {
    padding-left: 0px;
  }
`

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
      costOfGoods: 500000,
    },
    reValidateMode: 'onSubmit'
  })
  const {
    watch,
    handleSubmit: onSubmit,
  } = form

  // getValues periodically retrieves the form data
  usePersistForm({ value: watch(), localStorageKey: FormDataKey });

  const stepState = useState(0)
  const [activeStepState,] = stepState
  const isLastSteps = (activeStepState + 1) === DynModules.length;

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
      DynModules[activeStepState].component as React.ComponentType<{
        [k: string]: Any;
      }>

    return <Component />
  }, [activeStepState, isLastSteps])

  console.log('watch', watch())

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
              <AsideLeft md={8} item>
                <Suspense fallback={<div>Loading...</div>}>
                  {renderStepContent}
                </Suspense>
              </AsideLeft>

              <AsideRight md={4} item>
                <Summary stepState={stepState} />
              </AsideRight>
            </Form>
          </FormProvider>
        </Grid>
      </AppContent>
    </AppContainer>
  );
}

export default App;
