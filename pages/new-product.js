import React,{useState} from 'react'
import styled from '@emotion/styled';
import Router from 'next/router'
import {css} from '@emotion/core'
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmt, Error } from './../components/ui/Form';
import firebase from '../firebase';
// validations
import useValidation from '../hooks/useValidation';
import validateCreateProduct from '../validation/validateCreateProduct'


const INITIAL_STATE = {
  name: '',
  company: '',
  // image : '',
  url: '',
  description: '',
  
}

export default function NewProduct() {
  
  const [error, setError] = useState(false)
  const {values,errors,submitForm,handelChange,handelSubmit,handleBlur} = useValidation(INITIAL_STATE,validateCreateProduct,createAccount)

  const { name, company, image, url,description} = values;
  async function createAccount() {
    try {
      await firebase.signUp(name, email, password)
      Router.push('/') 
    } catch (error) {
      console.error('an error occured creating user', error.message)
      setError(error.message)
    }
  }

return (
  <div> 
    <Layout>
      <>
        <h1 css={css`text-align: center;margin-top: 5rem;`}
          >New Product
        </h1>
        <Form noValidate onSubmit={handelSubmit} action="">

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

            {/* <Field>
              <label htmlFor="img">Image</label>
              <input 
                type="file" 
                name="image" 
                id="image"
                value={image}
                onChange={handelChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.image && <Error>{errors.image}</Error>} */}
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
            onSubmit={handelSubmit}
            onBlur={handleBlur}
            type="submit"
            value="Create product"
          />
        </Form>
      </>
    </Layout>
  </div>
)
}
