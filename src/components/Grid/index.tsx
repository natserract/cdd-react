import React from 'react';
import { Conditional, HTMLAttributes } from 'src/types/share';
import styled from "styled-components"

type QuerySize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Query = {
  md: QuerySize;
  sm: QuerySize;
  xs: QuerySize;
}

type GridRootProps = Conditional<{
  container: boolean,
  fluid?: boolean;
  item?: never;
} & {
    [K in keyof Partial<Query>]: Omit<Query, K>
  }, {
    container?: never,
    item: boolean;
  } & {
    [K in keyof Partial<Query>]: Query[K]
  }>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const GridRoot = styled('div').attrs<GridRootProps>(({ fluid }) => ({
  className: fluid ? 'container-fluid' : 'container'
})).withConfig({
  displayName: 'Grid'
})((_props) => ({}))


type GridColumnProps = Partial<Query>

const GridColumn = styled('div').attrs<GridColumnProps>(({
  xs,
  md,
  sm,
}) => ({
  className: String(`
    ${md ? `md-${String(md)}` : ''}
    ${sm ? `sm-${String(sm)}` : ''}
    ${xs ? `xs-${String(xs)}` : ''}
  `).trimEnd()
})).withConfig({
  displayName: 'GridColumn'
})(() => ({}))

type GridProps = {
  children: React.ReactNode;
} & GridRootProps & GridColumnProps & Partial<HTMLAttributes<HTMLDivElement>>

// Grid using float (Maybe in future can use flex/grid)
const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    children,
    className,
    xs,
    sm,
    md = 12,
    ...other
  } = props

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { container, item } = other

  // User must choose one
  if (container && item) {
    window.console.error(
      new Error("App: Can't use item when passing container")
    )
  }

  const columnProps = {
    xs,
    sm,
    md,
  }

  const renderGrid = () => {
    if (!container && item) {
      return (
        <GridColumn {...columnProps}>
          {children}
        </GridColumn>
      )
    }

    return (
      <GridRoot
        ref={ref}
        {...other}
      >
        {children}
      </GridRoot>
    )
  }

  return renderGrid()
})

export default Grid