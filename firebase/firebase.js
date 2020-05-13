import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import firebaseConfig from './config';

class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }  
        this.auth = app.auth()
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // register user
    async signUp(name,email,password){
        const newUser = await this.auth.createUserWithEmailAndPassword(email,password)
        return await newUser.user.updateProfile({
            displayName: name
        })
    }

    // user log in
    async login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }

    // Close user session
    async closeSession(){
        console.log('closing')
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;