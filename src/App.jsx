import { useEffect, useState } from 'react'
import './App.css'
import { getAllProducts } from './utills/products';
import Card from './components/card';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  fetchproducts();
}, []);

useEffect(() => {}, [cartItems])
const addCartItem = (item) => { 
const items = [...cartItems]
items.push(item)
setCartItems([...items]);
}


const fetchproducts = async () => {
  const products = await getAllProducts();
  setProducts([...products]);
  console.log(products);
};

return (
    <>
 <div className='container mx-auto my-10'>
  <div className='flex items-center justify-center gap-10'>
  <h1 className='text-center text-4xl'>Shopping List</h1>
  <h1>Cart items</h1>
  </div>
 <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
    {
    products.map((data)=> {
      return <Card addToCart={()=> addCartItem(data)}
       key={data.id}
        item={data} /> 
    })}
    </div>
  </div>
</section>
</div>
    </>
  )
}

export default App
