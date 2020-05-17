import React,{useEffect,useState} from 'react'
import Layout from '../components/layouts/Layout';
import { useRouter } from 'next/router';
import ProductDetails from './../components/layouts/ProductDetails';
import useProducts from './../hooks/useProducts';

export default function Search() {
  const router = useRouter();
  const {query: {q}}= router;

  // all products
  const {products} = useProducts('created')
  const [result,setResult] = useState([])
  
  useEffect(()=>{
    const search = q.toLowerCase();
    const filter = products.filter( product =>{
      return(
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      )
    })
    setResult(filter)

  },[q,products])

  return (
    <div> 
      <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {result.map( product =>(
                  <ProductDetails
                    key={product.id}
                    product={product}
                  />
                ))}
              </ul>
            </div>
          </div>
      </Layout>
    </div>
  )
}
