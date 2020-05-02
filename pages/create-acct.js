import React from 'react'
import styled from '@emotion/styled';
import {css} from '@emotion/core'
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmt } from './../components/ui/Form';

// validations
import useValidation from './../components/hooks/useValidation';
import validateCreateaccount from './../validation/validateCreateAccount';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function CreateAcct() {

    const {values,errors,submitForm,handelChange,handelSubmit} = useValidation(INITIAL_STATE,validateCreateaccount,createAccount)

    createAccount = () =>{

    }

  return (
    <div> 
      <Layout>
        <>
          <h1 css={css`text-align: center;margin-top: 5rem;`}
            >Create Account
          </h1>
          <Form action="">
            <Field>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Your name"
              />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="email"
              />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Your password"
              />
            </Field>
            <InputSubmt 
              type="submit"
              value="Create account"
            />
          </Form>
        </>
      </Layout>
    </div>
  )
}
