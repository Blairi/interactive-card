import { useContext } from "react"
import { CardContext } from "../context/CardContext";

export const CardBack = () => {

  const { card } = useContext(CardContext);

  return (
    <div className='card back'>

      <div className="card-inner">

        <div className="ccv">
          <span>{ card.cvc }</span>
        </div>

      </div>

    </div>
  )
}
