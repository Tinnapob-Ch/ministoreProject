import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation/Nav';
import Home from './Page/Home/Home';
import Footer from './Footer/Footer';
import Favorite from './Navigation/Favorite/Favorite';
import Store from './Page/Store';
import Card from './Page/Cart';
import Member from './Page/Member';
import AirJordan from './Page/Store/AirJodan';
import AirMax from './Page/Store/AirMax';
import AirForce from './Page/Store/AirForce';
import Input from './components/Search';
import About from './Page/About';




function App() {
  useEffect(() => {
    axios.get('https://localhost:7137/api/sneakers')
    .then((response) => { 
      console.log(response.data);
    })
  }, [])

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7137/api/sneakers')
    .then((response) => { 
      setProducts(response.data);
    })
  }, []);

  const handleCategoryChange = event => {
    setQuery(event.target.value);
  }

  const filteredItems = products.filter((product) => 
    product.title && product.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = event => {
    setSelected(event.target.value);
  }

  return (
    <Router>
      <div>
       {/* <Input/> */}
        <Navigation/>
       
        
        <Switch>
          <Route path="/about"><About /></Route> 
          <Route path="/favorite"><Favorite likedProductId={selected} /></Route>  
          <Route path="/store"><Store/></Route>   
          <Route path="/cart"><Card/></Route>
          <Route path="/member"><Member/></Route>   
          <Route path="/AirJordan"><AirJordan/></Route>
          <Route path="/AirMax"><AirMax/></Route>
          <Route path="/AirForce"><AirForce/></Route>
          <Route path="/cart"><Card/></Route>
          <Route path="/member"><Member/>
          </Route><Route path="/"><Home /></Route>
          
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
