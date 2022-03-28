import DynModules from 'src/DynModules';

export const isCurrentStepOf = (step: number, name: string) => {
    return DynModules[step].name === name
}

export const isLastStep = (step: number) => {
    return (step + 1) === DynModules.length
}