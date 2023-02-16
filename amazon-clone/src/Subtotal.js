import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format';
import { SportsBasketball } from '@mui/icons-material';
import {useStateValue} from './StateProvider'
import { useHistory } from 'react-router-dom';
 
function Subtotal() {
  const history= useHistory();
    function calsum(sum){
      // basket.forEach((item)=>
      for(var i = 0; i < basket.length; i++)
      {
              sum += basket[i].price;
             }
             return sum;
            }
  const [{basket},dispatch] = useStateValue();
  return (
    <div className='subtotal'>
     <CurrencyFormat 
         renderText={(value) => (
          
            <>
            <p>
             Subtotal ({basket?.length} items): <strong> ${calsum(0)}</strong>   
            </p>
            <small className='subtotal_gift'>
                <input type='checkbox'/> This order contains a gift
            </small>
            </>
         )}
        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
     />
     <button onClick={e=>{history.push("/payment")}}  className='button'>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
