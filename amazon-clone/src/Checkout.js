import React from 'react'
import "./Checkout.css"
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
const Checkout = () => {
  const[{basket,user},dispatch]= useStateValue();
  return (
    <div className='checkout'>
    <div className='checkout_left'>
    <h1>Hello! {user?.email}</h1>
    <h1 className='checkout_heading'>your Shopping Basket</h1>
    <hr></hr>
    {basket.map((item) =>(
      <CheckoutProduct 
        id={item.id}
        title={item.title}
         image={item.image}
         rating={item.rating}
         price={item.price}
      />
    ))}
    
    </div>
    
      <div className='checkout_right'>
       <h1>Subtotal price</h1>
       <Subtotal/>
      </div>
    </div>
  )
}

export default Checkout
