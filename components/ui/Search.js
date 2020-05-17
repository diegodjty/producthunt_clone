import React,{useState} from 'react'
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Router from 'next/router'


const InputText = styled.input`
    border: solid 1px var(--gray3);
    padding: 1rem;
    min-width: 300px;
`

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 2rem;
    background-image: url('/static/img/searchIcon.svg');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: .8rem;
    border: none;
    text-indent: -999px;
    cursor: pointer;
`

const Search = () => {

    const [search,setSearch] = useState('')

    const searchProduct = e =>{
        e.preventDefault();

        if(search.trim() ==='') return;

        // redict user to /search
        Router.push({
            pathname: '/search',
            query: { q: search}
        })
    }

    return (
        <form 
            css={css` position: relative;`}
            onSubmit={searchProduct}
        >
            <InputText 
                type="text"
                placeholder=" Search Products"
                onChange = {e => setSearch(e.target.value)}
            />
            <InputSubmit type="submit"></InputSubmit>
        </form>
    )
}

export default Search
