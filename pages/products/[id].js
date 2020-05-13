import React,{useEffect,useContext,useState} from 'react'
import { useRouter } from 'next/router';
import FirebaseContext from './../../firebase/context';
import Error404 from './../../components/layouts/404';
import Layout from './../../components/layouts/Layout';

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
                if(product.exist){
                    setProduct(product.data())
                }else{
                    setError(true)
                }
            }
            getProduct()
        }
    },[id])
  
    return (
    <Layout>
        {error && <Error404/>}
    </Layout>  );
}
 
export default Product;