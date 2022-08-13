import { useState } from 'react'
import {CardContext} from './CardContext'

const details = {
  number: '2191912112323212',
  name: 'Jeffery Hust',
  month: '12',
  year: '23',
  cvc: '987',
}

export const CardProvider = ({ children }) => {

  const [card, setCard] = useState(details);

  return (
    <CardContext.Provider value={{card, setCard}}>
      { children }
    </CardContext.Provider>
  )
}
