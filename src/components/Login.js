import { useState } from 'react'
import {Link, useNavigate, useSubmit} from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
  const API = process.env.REACT_APP_API_BASE_URL
  const[email,setEmail] = useState(" ")
  const[password,setPassword] = useState(" ")
  const[loading,setLoading] = useState(false)
  
  const navigate = useNavigate();
  


  const submitHandler = (e)=>{
    e.preventDefault()
    setLoading(true)
    console.log("Hiii")
    console.log(API)
  
    axios.post(`${API}/user/login`,{
        email:email,
        password:password
    })
    .then(res=>{
      
      setLoading(false)
      console.log(res.data)
      navigate('/dashboard')
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('user_id',res.data._id)
      localStorage.setItem('channelName',res.data.channelName)
      localStorage.setItem('logoUrl',res.data.logoUrl)
      
      toast("Welcome to Stream Sphere")
    })
    .catch(err=>{
      setLoading(false)
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    })
    
    
  }
  return (
    <div className='main-wrapper'>
      <div className='wrapper-header'>
          <img className='logo-image' src={require('../assets/youtube.png')} alt="streamSphere-logo"/>
          <h2 className='cname'>StreamSphere</h2>
      </div>

            <form className='form-wrapper'>
                  <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Your Email'/>
                  <input required onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Your Password' autoComplete='off'/>
                  <button onClick={submitHandler} type="submit">{loading && <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>}Submit</button>
                  <Link className='link' to='/signup'>New User? Create an Account</Link>
            </form>
    </div>
  )
}

export default Login