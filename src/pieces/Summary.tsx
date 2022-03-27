import Grid, { GridProps } from 'src/components/Grid';
import Typography from 'src/components/Typography';
import { defaultTheme } from 'src/themes/default';
import styled from 'styled-components'
import Button from 'src/components/Button'

const SummaryRoot = styled(Grid)`
  height: 100%;

  ${defaultTheme.breakpoints.up('xs')} {
    padding: 20px 25px 0;
  }
`

type BaseProps = {}
type SummaryProps = BaseProps & Partial<Omit<GridProps, 'container' | 'item'>>

const Summary: React.FC<SummaryProps> = (props) => {
  const {
    ...other
  } = props

  return (
    <SummaryRoot item {...other}>
      <Typography color='textPrimary' component='h2' variant='h2' bolder>
        Summary

        <Typography sx={{ display: 'block', marginTop: 13 }}>
          10 items purchased
        </Typography>
      </Typography>

      <Grid item>
        {/* Cost of goods */}
        <Grid item>
          <Grid md={6} item>
            Cost of goods
          </Grid>
          <Grid md={6} item>
            500,000
          </Grid>
        </Grid>
        {/* End Cost of goods */}

        {/* Dropshiping fee */}
        <Grid item>
          <Grid md={6} item>
            Dropshiping Fee
          </Grid>
          <Grid md={6} item>
            5,900
          </Grid>
        </Grid>
        {/* End Dropshiping fee */}

        {/* Action */}
        <Button color='primary' size='large' variant='contained'>
          Continue To Payment
        </Button>
        {/* End Action */}
      </Grid>
    </SummaryRoot>
  )
}

export default Summary