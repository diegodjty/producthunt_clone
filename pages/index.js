import React,{useEffect,useState,useContext} from 'react'
import styled from '@emotion/styled';
import {FirebaseContext} from './../firebase'
import Layout from '../components/layouts/Layout';
import ProductDetails from './../components/layouts/ProductDetails';



export default function Home() {

  const [products,setProducts] = useState([]);

  const {firebase } = useContext(FirebaseContext);

  useEffect( ()=>{
    const getProducts = () => {
      firebase.db.collection('products').orderBy('created','desc').onSnapshot(handleSnapshot)
    }
    getProducts()
  },[]);

  function handleSnapshot(snapshot){
    const products = snapshot.docs.map( doc =>{
      return{
        id: doc.id,
        ...doc.data()
      }
    })
    setProducts(products)
  }


  return (
    <div> 
      <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {products.map( product =>(
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
