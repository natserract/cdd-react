import React from 'react'
import styled from "styled-components";

type WidgetRootProps = {
  width?: number,
  variant?: "square" | "rounded",
  sx?: Record<string, unknown>
}

const WidgetRoot = styled('div').withConfig<WidgetRootProps>({
  displayName: 'WidgetRoot',
})(({ theme, width, variant, sx }) => ({
  width,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.customShadows.widgetDark,
  minWidth: 128,
  minHeight: 128,
  margin: 8,

  ...(variant !== "square" && {
    borderRadius: theme.shape.borderRadius,
  }),

  // Used for custom/additional style
  // @see: https://mui.com/system/the-sx-prop/
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