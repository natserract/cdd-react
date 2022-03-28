import Typography from "src/components/Typography"
import { defaultTheme } from "src/themes/default"
import styled from "styled-components"

const Title = styled(Typography)`
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
  max-width: 200px;
}
`

export default Title