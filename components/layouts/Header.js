import React from 'react'
import Link from 'next/link'
import style from '@emotion/styled'

import Search from '../ui/Search';
import Nav from './Nav';



const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Search />
                    <Nav />
                </div>
                <div>
                    <p>Hi: Diego </p>
                    <button type="button">Sign out</button>
                    <Link href="">Login</Link>
                    <Link href="">Create Account</Link>
                </div>
            </div>
        </header>
    )
}

export default Header
