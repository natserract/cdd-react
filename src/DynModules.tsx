import { lazy } from 'react';

const Delivery = lazy(() => import('src/pieces/DeliveryDetails'))
const Payment = lazy(() => import('src/pieces/Payment'))

const DynModules = [
  {
    key: 'delivery',
    name: 'Delivery',
    component: Delivery,
  },
  {
    key: 'payment',
    name: 'Payment',
    component: Payment,
  },
  {
    key: 'finish',
    name: 'Finish',
    component: Delivery
  },
]

export default DynModules