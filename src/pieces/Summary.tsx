import Grid, { GridProps } from 'src/components/Grid';
import Typography from 'src/components/Typography';
import { defaultTheme } from 'src/themes/default';
import styled from 'styled-components'
import Button from 'src/components/Button'
import { formatMoney } from 'src/utils/format';
import { mqXsLandscape, } from 'src/themes/breakpoints';

const SummaryRoot = styled(Grid)`
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

const SxItemSummaryContainer = {
  "& > div:not(:last-child)": {
    display: 'flex',
    marginBottom: 10,
  }
}
const SxItemSummaryText = {
  "& > div:last-child": {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}

const SxItemSummaryTotal = {
  margin: '7px 0 25px',
  display: 'flex',

  [`${defaultTheme.breakpoints.down('xs')}`]: {
    marginBottom: 30,
  }
}

type BaseProps = {
  checkBoxState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
type SummaryProps = BaseProps & Partial<Omit<GridProps, 'container' | 'item'>>

const Summary: React.FC<SummaryProps> = (props) => {
  const {
    onClick,
    checkBoxState,
    ...other
  } = props

  const [checkedState] = checkBoxState

  const handleClickButton = (e) => {
    onClick(e)
  }

  return (
    <SummaryRoot item {...other}>
      <Typography color='textPrimary' component='h2' variant='h2' bolder>
        Summary

        <Typography sx={{ display: 'block', marginTop: 13 }}>
          10 items purchased
        </Typography>
      </Typography>

      <Grid item>
        <Grid sx={SxItemSummaryContainer} item>
          {/* Cost of goods */}
          <Grid sx={SxItemSummaryText} item>
            <Grid md={6} sm={6} xs={6} item>
              Cost of goods
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography bolder>500,000</Typography>
            </Grid>
          </Grid>
          {/* End Cost of goods */}

          {/* Dropshiping fee */}
          <Grid sx={SxItemSummaryText} item>
            <Grid md={6} sm={6} xs={6} item>
              Dropshiping Fee
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography bolder>{checkedState ? formatMoney(5900) : '-'}</Typography>
            </Grid>
          </Grid>
          {/* End Dropshiping fee */}

          {/* Total */}
          <Grid sx={{ ...SxItemSummaryText, ...SxItemSummaryTotal }} item>
            <Grid md={6} sm={6} xs={6} item>
              <Typography color='textPrimary' variant='h3' bolder>Total</Typography>
            </Grid>
            <Grid md={6} sm={6} xs={6} item>
              <Typography color='textPrimary' variant='h3' bolder>505,900</Typography>
            </Grid>
          </Grid>
          {/* End Total */}
        </Grid>

        {/* Action */}
        <Button
          color='primary'
          size='large'
          variant='contained'
          fullWidth
          onClick={handleClickButton}
        >
          Continue To Payment
        </Button>
        {/* End Action */}
      </Grid>
    </SummaryRoot>
  )
}

export default Summary