import React from 'react'
import { Any } from 'src/types/share';
import styled from "styled-components";

type WidgetRootProps = {
  variant?: "square" | "rounded",
  fullWidth?: boolean;

  // Used for custom/additional style
  // @see: https://mui.com/system/the-sx-prop/
  sx?: React.CSSProperties | { [k: string]: Any },
}

const WidgetRoot = styled('div').withConfig<WidgetRootProps>({
  displayName: 'Widget',
})(({ theme, variant, sx, fullWidth }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.customShadows.widgetWide,
  minWidth: 128,
  minHeight: 128,
  margin: 8,
  boxSizing: 'border-box',

  ...(fullWidth && {
    width: '100%',
  }),

  ...(variant !== "square" && {
    borderRadius: theme.shape.borderRadius,
  }),

  ...sx,
}))

type WidgetProps = {
  children?: React.ReactNode,
} & WidgetRootProps

const Widget = React.forwardRef<HTMLDivElement | null, WidgetProps>((props, ref) => {
  const {
    variant = "square",
    ...other
  } = props

  return (
    <WidgetRoot
      ref={ref}
      variant={variant}
      {...other}
    />
  )
})
export default Widget