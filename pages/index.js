import React from 'react'
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import ProductDetails from './../components/layouts/ProductDetails';
import useProducts from './../hooks/useProducts';


export default function Home() {

  const {products} = useProducts('created')

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
