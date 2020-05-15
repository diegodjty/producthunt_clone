import React,{useState,useContext} from 'react'
import styled from '@emotion/styled';
import Router,{useRouter} from 'next/router'
import {css} from '@emotion/core'
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmt, Error } from './../components/ui/Form';
import {FirebaseContext} from '../firebase';
import FileUploader from 'react-firebase-file-uploader'
// validations
import useValidation from '../hooks/useValidation';
import validateCreateProduct from '../validation/validateCreateProduct'
import Error404 from '../components/layouts/404';


const INITIAL_STATE = {
  name: '',
  company: '',
  // image : '',
  url: '',
  description: '',
  
}

const NewProduct = () => {

  // image state
  const[imageName,setImageName] = useState('');
  const[uploading,setUploading]= useState(false);
  const[progress, setProgress] = useState(0);
  const[imageUrl,setImageUrl] = useState('');
  
  
  const [error, setError] = useState(false)
  const {values,errors,submitForm,handelChange,handelSubmit,handleBlur} = useValidation(INITIAL_STATE,validateCreateProduct,createProduct)

  const { name, company, image, url,description} = values;

  // routing hook to redirect
  const router = useRouter();

  // context with crud operation firebase
  const {user, firebase} = useContext(FirebaseContext)

  
  async function createProduct() {
    console.log('diego')
    if(!user){
      return router.push('/login')
    }

    // create object of product
    const product = {
      name,
      company,
      url,
      imageUrl,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      }
    }
    console.log(product);
    // insert in databse
    firebase.db.collection('products').add(product);
    return router.push('/')
  }

  const handleUploadStart = () =>{
    setProgress(0);
    setUploading(true);
  }

  const handleProgress = progress => setProgress({progress})

  const handleUploadError = error => {
    setUploading(error);
    console.log(error);
  }

  const handleUploadSuccess = name => {
    setProgress(100);
    setUploading(false);
    setImageName(name)
    firebase
          .storage
          .ref('products')
          .child(name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
            setImageUrl(url)
          });
  }

return (
  <div> 
    <Layout>
      
        {!user ? <Error404 /> : (
          <> 
          <h1 css={css`text-align: center;margin-top: 5rem;`}
            >New Product
          </h1>
          <Form  onSubmit={handelSubmit} noValidate>
  
            <fieldset>
              <legend>General info</legend>
              <Field>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  placeholder="Your name"
                  onChange={handelChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}
  
              <Field>
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  name="company" 
                  id="company"
                  value={company}
                  placeholder="Your company"
                  onChange={handelChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.company && <Error>{errors.company}</Error>}
  
              <Field>
                <label htmlFor="img">Image</label>
                <FileUploader 
                  accept="image/*" 
                  name="image" 
                  id="image"
                  randomizeFilename
                  storageRef={firebase.storage.ref('products')}
                  inUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>
              <Field>
                <label htmlFor="url">Url</label>
                <input 
                  type="url" 
                  name="url" 
                  id="url"
                  value={url}
                  placeholder="Your product url"
                  onChange={handelChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>About your product</legend>
              <Field>
                <label htmlFor="description">Description</label>
                <textarea 
                  name="description" 
                  id="description"
                  value={description}
                  placeholder="Your description"
                  onChange={handelChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.description && <Error>{errors.description}</Error>}
  
            </fieldset>
  
            {error && <Error>{error}</Error>}
            <InputSubmt
              type="submit"
              value="Create product"
            />
          </Form>
        </>
        )}
      
    </Layout>
  </div>
)
}

export default NewProduct