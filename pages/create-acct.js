import React,{useState} from 'react'
import styled from '@emotion/styled';
import Router from 'next/router'
import {css} from '@emotion/core'
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmt, Error } from './../components/ui/Form';
import firebase from '../firebase';
// validations
import useValidation from '../hooks/useValidation';
import validateCreateaccount from '../validation/validateCreateAccount';


const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function CreateAcct() {
  
    const [error, setError] = useState(false)
    const {values,errors,submitForm,handelChange,handelSubmit,handleBlur} = useValidation(INITIAL_STATE,validateCreateaccount,createAccount)

    const { name, email, password} = values;
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
            >Create Account
          </h1>
          <Form noValidate onSubmit={handelSubmit} action="">
            <Field>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Your name"
                onChange={handelChange}
              />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}
            
            <Field>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="email"
                onChange={handelChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Your password"
                onChange={handelChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmt
              onSubmit={handelSubmit}
              onBlur={handleBlur}
              type="submit"
              value="Create account"
            />
          </Form>
        </>
      </Layout>
    </div>
  )
}
