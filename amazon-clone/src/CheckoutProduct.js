import React from 'react'
import "./ckeckoutproduct.css"
import { useStateValue } from './StateProvider'
function CheckoutProduct({id,title,price,rating,image}) {
    const [{basket},dispatch] = useStateValue();
    const removeproduct = () =>{
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id : id
        })
    } 
  return (
    <div className='checkoutproduct'>
      <div className='checkoutproductimage'>
        <img src={image}></img>
      </div>
      <div className='checkoutbody'>
        <p className='checkoutbodytitle'>{title}</p>
        <p className='checkoutbodyprice'>{price}</p>
        <div className='checkoutbodyrating' >
        {Array(rating).fill().map((_,i) => (<p>&#9733;</p>))}
        </div>
        <button onClick ={removeproduct} className='checkoutbodybutton' >Remove from basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
