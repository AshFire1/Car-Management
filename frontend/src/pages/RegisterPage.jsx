import React, { useEffect, useState } from 'react'
import "../styles/Register.scss"
import { useNavigate } from 'react-router-dom'
const RegisterPage = () => {
    const [formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        profileImage:null
    })
    const navigate=useNavigate()
    const HandleChange=(e)=>{
        const {name,value,files}=e.target
        setFormData({
            ...formData,[name]:value,
            [name]:name==="profileImage"?files[0]:value
        })
    }
    const [passwordMatch,setPasswordMatch]=useState(true)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const register_form=new FormData()
            for(var key in formData){
                register_form.append(key,formData[key])
            }
            const response=await fetch("http://localhost:3001/api/auth/register",{
                method:"POST",
                body: register_form
            })
            if(response.ok){
                navigate("/login")
            }
        }catch(err){
            console.log("Registration Failed",err.message)
        }
    }
    useEffect(()=>{
        setPasswordMatch(formData.password===formData.confirmPassword || formData.confirmPassword==="")
    },[formData.confirmPassword,formData.password])
    console.log(formData)
  return (
    <div className='register'>
        <div className='register_content'>
            <form className='register_content_form' onSubmit={handleSubmit}>
                <input placeholder='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={HandleChange}
                required/>
                <input placeholder='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={HandleChange}
                required/>
                <input placeholder='Email'
                name='email'
                value={formData.email}
                onChange={HandleChange}
                type='email'
                required/>
                <input placeholder='Password'
                name='password'
                value={formData.password}
                onChange={HandleChange}
                type='password'
                required/>
                <input placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={HandleChange}
                type='password'
                required/>
                {!passwordMatch && (
                    <p style={{color:"red"}}> Passwords Are Not Matching</p>
                )}
                <input
                onChange={HandleChange} 
                id="image" type='file' name='profileImage' accept='image/*' style={{display:'none'}}
                required/>
                <label htmlFor='image'>
                    <img src='/assets/addImage.png' alt='add Profile Photo'/>
                    <p>Upload Your Image</p>
                </label>
                {formData.profileImage && 
                <img src={URL.createObjectURL(formData.profileImage)} alt='profile-pic'
                style={{maxWidth:"200px"}}/>}
                <button type='submit' disabled={!passwordMatch}>Register</button>
            </form>
            <a href='/login'>Already Have an account? Log In Here</a>

        </div>
    </div>
  )
}

export default RegisterPage