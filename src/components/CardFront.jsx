
import { useContext } from 'react';
import cardLogo from '../assets/card-logo.svg';
import { CardContext } from '../context/CardContext';
import { formatNumber } from '../helpers/formatNumber';

export const CardFront = () => {


  const { card } = useContext(CardContext);

  return (
    <div className='card front'>
      <div className="card-inner">
        <img src={cardLogo} alt="card logo" className='logo' />

        <span className="number">{ formatNumber(card.number) }</span>

        <div className="details">
          <span>{card.name}</span>
          <span>{card.month}/{card.year}</span>
        </div>

      </div>

    </div>
  )
}
