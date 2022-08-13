import { CardBack } from './components/CardBack';
import { CardFront } from './components/CardFront';
import { Form } from './components/Form';
import { CardProvider } from './context/CardProvider';

import './scss/app.scss';

export const InteractiveCard = () => {

  return (
    <CardProvider>
      <div className='layout'>

        <div className='bg-image'>

          <div className='cards'>

            <CardFront />

            <CardBack />

          </div>

        </div>

        <div className='form-container'>
          <Form />
        </div>

      </div>
    </CardProvider>
  )
}
