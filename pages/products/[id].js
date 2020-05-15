import React,{useEffect,useContext,useState} from 'react'
import { useRouter } from 'next/router';
import FirebaseContext from './../../firebase/context';
import Error404 from './../../components/layouts/404';
import Layout from './../../components/layouts/Layout';
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { InputSubmt,Field } from './../../components/ui/Form';
import Button from './../../components/ui/Button';


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
    const {firebase,user} = useContext(FirebaseContext)

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

    const {comments , company , description , name, url, votes , imageUrl,created,creator} = product
    return (
    <Layout>
        <>
            {error && <Error404 />}
            <div className="contenedor">
                    <h1 css={css`text-align:center;margin-top:5rem;`}>{name}</h1>
                <ProductContainer>
                    <div>
                    <p>{formatDistanceToNow(new Date(created))} ago by {creator.name} </p>
                    <img src={imageUrl} alt=""/>
                    <p>{description}</p>

                    {user && (
                        <>
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
                        </>
                    )}

                    <h2 css={css`margin: 2rem 0;`}>Comments</h2>
                    {comments.map(comment =>(
                        <li>
                            <p>{comment.name}</p>
                            
                        </li>
                    ))}
                    </div>
                    <aside>
                        <Button
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visit URL</Button>

                        {user && (
                            <Button>
                                Vote
                            </Button>
                        )}
                        <p css={css`text-align:center;`}>{votes} Votes</p>
                    </aside>
                </ProductContainer>
            </div> 
        </>
    </Layout>  );
}
 
export default Product;