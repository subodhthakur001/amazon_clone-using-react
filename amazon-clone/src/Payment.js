import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
import axios from './axios';
import { db } from './firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Payment() {
    const [{basket,user}, dispatch] = useStateValue();
    const[error,seterror] =useState(null);
    const[disabled,setdisabled] =useState(true);
    const[succeeded,setsucceeded] =useState(false);
    const[processing,setprocessing] =useState("");
    const[clientsecret,setclientsecret] = useState("");
    const stripe = useStripe();
    const element = useElements();
    const history = useHistory();
    useEffect(()=>{
      //generate the special stripe secret that allows us to charge a customer
      const getClientsecret = async()=>{
       const response= await axios({
        method:'post',
        url:`/payments/create?total=${calsum(0)*100}`
       })
       setclientsecret(response.data.clientsecret);
      }
      getClientsecret();
    },[basket])
    console.log("your"+clientsecret);
    const handlesubmit= async (e)=>{
      e.preventDefault();
      setprocessing(true);
      const payload = await stripe.confirmCardPayment(clientsecret,{
          payment_method : {
                card : element.getElement(CardElement)
          }
        
      }).then(({paymentIntent})=>{
        //paymentIntent : payment confirmation
    db
       .collection('users')
       .doc(user?.uid)
       .collection('orders')
       .doc(paymentIntent.id)
       .set({
        basket : basket,
        amount : paymentIntent.amount,
        created : paymentIntent.created
        })
      dispatch({
        type: "EMPTY_BASKET"
      })
           setsucceeded(true);
           seterror(null);
           setprocessing(false)
           history.replace("/orders")
      })
      
      

    }
    const handlechange= event=>{
      setdisabled(event.empty);
      seterror(event.error?event.error.message:"");
    }
    function calsum(sum){
      // basket.forEach((item)=>
      for(var i = 0; i < basket.length; i++)
      {
              sum += basket[i].price;
             }
             return sum;
            }
  return (
    <div className='Payment'>
    <h1>{basket?.length} items</h1>
    <hr></hr>
      <div className='payment_section'>
         <h1 className='payment_title'>Delivery Address</h1>
         <div className='payment_address'>
             <p>{user?.email}</p>
             <p>WA-109,Shakarpur,Laxmi Nagar</p>
             <p>New Delhi 111059</p>
         </div>
      </div> 
      <hr></hr>
      <br></br>
      <div className='payment_section'>
      <h1 className='payment_title'>Checkout Products</h1>
      <div className='payment_address'>
        {basket.map((item)=>(
            <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}  
            />
        ))}
        </div>
      </div> 
      <hr></hr>
      <br></br>
      <div className='payment_section'>
      <h1 className='payment_title'>Proceed to pay</h1>
      <div className='payment_address'>
      <form className='payment_form' onSubmit={handlesubmit}>
      <CardElement onChange={handlechange}/>
      <div className='setcurrency'>
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
       <button disabled={processing||disabled||succeeded}>
        <span>{processing? <p>Processing</p>:"Buy Now"}</span>
       </button>
      </div>
         <p>{error?error:""}</p>
      </form>
      </div>
      </div>      
    </div>
  )
}

export default Payment
