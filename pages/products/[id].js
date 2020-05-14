import React,{useEffect,useContext,useState} from 'react'
import { useRouter } from 'next/router';
import FirebaseContext from './../../firebase/context';
import Error404 from './../../components/layouts/404';
import Layout from './../../components/layouts/Layout';
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { InputSubmt,Field } from './../../components/ui/Form';

const ProductContainer = styled.div`
   @media (min-width: 768px){
       display: grid;
       grid-template-columns: 2fr 1fr;
       column-gap: 2rem;
   }
`;

const Product = () => {

    const [product,setProduct] = useState({})
    const [error,setError] = useState(false);

    // Routing to get actual id
    const router = useRouter();
    const {query: {id}} = router;

    // firebase context
    const {firebase} = useContext(FirebaseContext)

    useEffect( ()=>{
        if(id){
            const getProduct = async () =>{
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists){
                    setProduct(product.data())
                }else{
                    setError(true)
                }
            }
            getProduct()
            
        }
    },[id])

    if(Object.keys(product).length===0) return 'Loading'

    const {comments , company , description , name, url, votes , imageUrl,created} = product
    return (
    <Layout>
        <>
            {error && <Error404 />}
            <div className="contenedor">
                    <h1 css={css`text-align:center;margin-top:5rem;`}>{name}</h1>
                <ProductContainer>
                    <div>
                    <p>public: {formatDistanceToNow(new Date(created))} </p>
                    <img src={imageUrl} alt=""/>
                    <p>{description}</p>

                    <h2>Add your comment</h2>
                    <form>
                        <Field >
                            <input 
                                type="text" 
                                name="message" 
                                i
                            />
                        </Field>
                        <InputSubmt
                            type="submit"
                            value=" Add comment "
                        >
                        </InputSubmt>
                    </form>

                    <h2 css={css`margin: 2rem 0`}>Comments</h2>
                    {comments.map(comment =>(
                        <li>
                            <p>{comment.name}</p>
                            <p>By: {comment.userName}</p>
                        </li>
                    ))}
                    </div>
                    <aside>
                        2
                    </aside>
                </ProductContainer>
            </div> 
        </>
    </Layout>  );
}
 
export default Product;