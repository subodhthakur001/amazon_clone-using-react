import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'

function Product({id,title,price,rating,image}) {
    const [state,dispatch] = useStateValue();

    const addBasket = () => {
      console.log(state);
      dispatch({
            type: "ADD_TO_BASKET",
            item: {
              id : id,
              title : title,
              price : price,
              rating: rating,
              image : image
            }
      });
    };
        
  return (
    <div className='box'>
      <div className='description'>
         <p>{title}</p>
      </div>
      <div className='Price'>
         <small>
         $
         </small>
         <strong>{price}</strong>
      </div>
      <div className='rating'>
         {Array(rating).fill().map((_,i) => (<p>&#9733;</p>))}
         
      </div>
      <div className='image'>
       <img src={image}></img>
       <button onClick={addBasket}>Add to basket</button>
      </div>
    </div>
  )
}

export default Product
