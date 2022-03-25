import { ThemeProvider } from 'styled-components'

import { defaultTheme } from "./default";

/**
 * Example:
 * ```tsx
 *  background-color: ${props => props.theme.palette.primary.main};
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const Theme: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
)

export default Theme