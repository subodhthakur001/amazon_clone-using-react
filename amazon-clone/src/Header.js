import React, { Component } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom'
import {useStateValue } from './StateProvider'
import { auth } from './firebase';
export default function Header(){
  const [{basket,user},dispatch] = useStateValue(); 
    const handleSinout= ()=>{
      if(user){
        auth.signOut();
      }
    }
    return (
      <div className='Header'>
        <Link to="/">
        <img className='logo' src='/amazon.jpeg' ></img>
        </Link>
           
      <div className='search_bar' > 
         <input className='search' ></input>
         <SearchIcon className='search_logo' />
      </div>
    <div className='header_nav'>
    <Link to={!user? "/login":"/"}>
      <div onClick={handleSinout} className='header_nav_option' >
        <span className='upper'> Hello Guest</span>
        <span className='lower'>{user? 'Sign Out' : 'Sign In'}</span>
      </div>
      </Link>
      <div className='header_nav_option' >
      <span className='upper'>Return</span>
        <span className='lower'>& Orders</span>
      </div>
      <div className='header_nav_option' >
      <span className='upper'> your</span>
        <span className='lower'>prime</span>
      </div>
      <Link to="/checkout">
      <div className='header_basket' >
      <ShoppingBasketIcon className='basket'  />
      <span className='basket_counter' > {basket?.length}</span>
      </div>
      </Link>
      
    </div>
      </div>
    )
  }

