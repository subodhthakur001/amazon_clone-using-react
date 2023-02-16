
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout.js'
import Login from './Login';
import{BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import { useEffect } from 'react';
import { auth } from './firebase';
import {useStateValue} from './StateProvider'
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51MXK7MSBcfII8LeuupkrutKAZY2Fu8gfBfQ0UBGXqnYjzCactuzVlvYc1lI0fUkzerfiD8432JmAmrJTKp3Wz2xi001knFDSwt');
  
function App() {
  const [{basket,user},dispatch] = useStateValue();
  useEffect(() =>{
    auth.onAuthStateChanged((authuser) =>{
      if(authuser){
        //user just logged in or user was logged in 
        dispatch({
          type:"SET_USER",
          user : authuser
        })
      }
      else{
       dispatch({
        type :"REMOVE_USER",
        user : null
       })
      }
    })
  },[])
  return (
    <Router>
    <div className="App">
    <Switch>
    <Route path='/checkout'>
    <Header/>
    <Checkout/>
    </Route>
    <Route path ="/login">
      <Login/>
    </Route>
    <Route path ="/orders">
      <Header />
      <Orders />
    </Route>
    <Route path='/payment'>
      <Header/>
      <Elements stripe={promise}>
      <Payment/>
      </Elements>
    </Route>
    <Route path='/'>
    <Header/>
    <Home/>
    </Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
