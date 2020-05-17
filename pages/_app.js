import App from 'next/app';
import firebase  from '../firebase'
import useAuth from '../hooks/useAuth'
import FirebaseContext from './../firebase/context';

const MyApp = (props) =>{
    const user  = useAuth()
    const {Component,pageProps} = props
    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                user
            }}
        >
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    )

}

export default MyApp;