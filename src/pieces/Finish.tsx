import { useFormContext } from "react-hook-form"
import Grid from "src/components/Grid"
import Typography from "src/components/Typography"
import { getShipmentData } from "src/static/business"
import { defaultTheme } from "src/themes/default"
import { cryptoRandomString } from "src/utils/random"
import styled from "styled-components"
import Button from 'src/components/Button'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined'

import Title from "./Title"

const FinishContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;

  ${defaultTheme.breakpoints.down('xs')} {
    margin-top: 1rem;
  };

  > div {
    display: flex;
    flex-direction: column; 
  }
`

const FinishActionGrid = styled(Grid)`
  margin-top: 4rem;

  ${defaultTheme.breakpoints.down('xs')} {
    margin-top: 2rem;
    padding: 0 3px;
  }
`

const Finish: React.FC = () => {
  const { getValues } = useFormContext()
  const generate = cryptoRandomString

  return (
    <FinishContainer item>
      <Grid md={6} xs={12} item>
        <Title component='h2' sx={{ marginBottom: 25 }}>
          Thank you
        </Title>

        <Typography component='p' sx={{ marginBottom: 10 }} bolder>
          Order ID: {generate(5, undefined, "1I0O")}
        </Typography>
        <Typography>
          Your order will be delivered {getShipmentData(getValues('shipmentName')).estimate} with {getValues('shipmentName')}
        </Typography>

        <FinishActionGrid item>
          <Button startIcon={<ArrowLeftOutlined />} noPadding>
            Go To homepage
          </Button>
        </FinishActionGrid>
      </Grid>
    </FinishContainer>
  )
}

export default Finish