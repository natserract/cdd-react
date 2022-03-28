import Typography, { TypographyProps } from "src/components/Typography"
import { defaultTheme } from "src/themes/default"
import styled from "styled-components"

const TitleRoot = styled(Typography)`
  position: relative;
  display: inline-block;

  :after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 105%;
    height: 8px;
    background: #ececec;
    opacity: .5;
    mix-blend-mode: darken;
  }

  ${defaultTheme.breakpoints.down('xs')} {
    // max-width: 200px;
    font-size: 45px;
  }
`

type TitleProps = {} & Omit<TypographyProps, 'color' | 'bolder' | 'variant'>

const Title: React.FC<TitleProps> = (props) => {
  const { component, ...other } = props

  return (
    <TitleRoot
      color='textPrimary'
      component={component}
      variant='h1'
      bolder
      {...other}
    >
      {props.children}
    </TitleRoot>
  )
}

export default Title