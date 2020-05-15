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

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;

`;

const Product = () => {

    const [product,setProduct] = useState({})
    const [error,setError] = useState(false);
    const [comment,setComment] = useState({});

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
    },[id, product])

    if(Object.keys(product).length===0) return 'Loading'

    const {comments , company , description , name, url, votes , imageUrl,created,creator,hasVoted} = product

    // Manage and validate votes
    const productVote = () => {
        if(!user){
            router.push('/login')
        }

        // get and add new votes
        const newTotal = votes+1

        // Check if user voted
        if(hasVoted.includes(user.uid)) return;

        // Save id of user that votes
        const newhaveVoted = [...hasVoted, user.uid];

        //update DB
        firebase.db.collection('products').doc(id).update({votes: newTotal, hasVoted: newhaveVoted})

        //update State
        setProduct({
            ...product,
            votes: newTotal
        })

    }

    // Functions to create comments
    const commentsChange = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    // Identify if the comment is from the maker of the product
    const isCreator = id =>{
        if(creator.id == id){
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if(!user){
            return router.push('/login')
        }

        // extra info to comment
        comment.userId = user.uid;
        comment.name = user.displayName;

        // get copie of comments and add to array
        const newComments = [...comments,comment]

        //update DB
        firebase.db.collection('products').doc(id).update({
            comments: newComments
        })

        //update State
        setProduct({
            ...product,
            comments: newComments
        })

    }

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
                            <form onSubmit={addComment}>
                                <Field >
                                    <input 
                                        type="text" 
                                        name="message" 
                                        onChange={commentsChange}
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
                    {comments.length === 0 ? "No comments yet" : (
                        <ul>
                            {comments.map((comment, i) => (
                                <li
                                    key={`${comment.userId}-${i}`}
                                    css={css`border: solid 1px #e1e1e1;padding: 2rem;`}
                                >
                                    <p>{comment.message}</p>
                                    <p>By:
                                        <span
                                            css={css`font-weight:bold;`}
                                        >
                                           {' '} { comment.name}
                                        </span>
                                    </p>
                                    {isCreator(comment.userId) && <ProductCreator> Creator</ProductCreator>}
                                </li>
                            ))}
                        </ul>
                    )}
                    </div>
                    <aside>
                        <Button
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visit URL</Button>

                        {user && (
                            <Button
                                onClick={productVote}
                            >
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