import { useState } from 'react'
import {auth ,googleProvider } from '../config/firebase.js'
import {createUserWithEmailAndPassword ,signOut ,signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'

const Auth = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);

    const signup = async()=>{
      try{
        const data = await createUserWithEmailAndPassword(auth,email,password)
      }catch(err){
        console.error(err);
      }
    }

    const login = async ()=>{
      try{
        const data = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
      }catch(err){
        console.error(err);
      }
    }


    const singInWithGoogle = async()=>{
        const data = await signInWithPopup(auth,googleProvider)
      
    }
    const logOut = async()=>{
      try{
        const data = await signOut(auth)
      }catch(err){
        console.error(err);
      }
    }
  return (
    <div>
        <small>Create new account</small>
        <br />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email...' />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password...' />
        <button onClick={signup}>Sign up</button>
        <br />
        <br />
        <button onClick={singInWithGoogle}>Sign in with google</button>
        <br />
        <br />
        <small>login if you already have an account</small>
        <br />
        <input value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} type="text" placeholder='Email...' />
        <input value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} type="text" placeholder='Password...' />
        <button onClick={login}>login</button>
        <br />
        <br />
        <button onClick={logOut}>Log out</button>
        <br />
        <br />
        
    </div>
  )
}

export default Auth