import React from "react";
import { HTMLAttributes } from "src/types/share";
import styled from 'styled-components'
import RightOutlined from "@ant-design/icons/RightOutlined";

type StepIconRootProps = {
  color?: "primary" | "secondary" | "error" | "success" | "info"
}

const StepIconRoot = styled('div').withConfig<StepIconRootProps>({
  displayName: 'StepIcon'
})(({ theme, color }) => ({
  display: 'inline-flex',
  color: theme.palette[color].main,
  fontSize: 13,
}))

export type StepIconProps = {
  icon?: React.ReactNode;
} & StepIconRootProps & Partial<HTMLAttributes<HTMLDivElement>>

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>((props, ref) => {
  const { icon, color = 'primary', ...other } = props

  const renderIcon = icon || <RightOutlined />;

  return (
    <StepIconRoot ref={ref} color={color} {...other}>
      {renderIcon}
    </StepIconRoot>
  )
})

export default StepIcon