import React, { useState } from 'react'
import "../styles/Login.scss"
import { setLogin } from '../redux/state';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'; 
const LoginPage = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
   e.preventDefault()
   try{
    
    const response=await fetch("http://localhost:3030/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    console.log(response)
    if(response.status===200){
      const loggedIn=await response.json()
      if(loggedIn){
        dispatch(
          setLogin({
            user:loggedIn.user,
            token:loggedIn.token
          })
        )
        navigate("/")
      }
    }else{
      setError("Invalid Credentials!")
      console.log("here")
      setTimeout(()=>{
        setError("")
      },5000)
    }
    
   }catch(err){
    console.log("Login Failed", err.message)

   } 
  }
  return (
    <div className='login'>
        <div className='login_content'>
            <form className='login_content_form' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}required/>
                <input 
                type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' value={password}
                required/>
                
                <button type='submit'>Log In </button>
            </form>
            {error.length!==0 && (<p style={{color:'white'}}>Invalid Credentials</p>)}
            <a href='/register'>Don't Have An Account ? Sign Up Here</a>
        </div>
    </div>
  );
};

export default LoginPage