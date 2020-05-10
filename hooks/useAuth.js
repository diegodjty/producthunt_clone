import React,{useEffect,useState} from 'react'
import firebase from '../firebase';

function useAuth(){
    const [usertAuth,setuserAuth] = useState(null)

    useEffect( () => {
        const unsubcribe = firebase.auth.onAuthStateChanged(user =>{
            if(user){
                setuserAuth(user)
            }else{
                setuserAuth(null)
            }
        })
        return ()=> unsubcribe()
    },[])
    return usertAuth
}

export default useAuth