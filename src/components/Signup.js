import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify'


const Signup = () => {
  const API = process.env.REACT_APP_API_BASE_URL
  const[channelName,setChannelName] = useState(" ")
  const[email,setEmail] = useState(" ")
  const[password,setPassword] = useState(" ")
  const[phone,setPhone] = useState(" ")
  const[logo,setLogo] = useState(null)
  const[imageUrl,setImageUrl] = useState(' ')
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const fileHandler = (e)=>{
    e.preventDefault()
    setLogo(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  const submitHandler = (e)=>{
    e.preventDefault()
    setLoading(true)
    console.log("Hiii")
    const formData = new FormData();
    formData.append('channelName',channelName)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('phone',phone)
    formData.append('logo',logo)
    axios.post(`${API}/user/signup`,formData)
    .then(res=>{
      setLoading(false)
      console.log(res.data)
      navigate('/login')
      toast("Account is created Successfylly")
    })
    .catch(err=>{
      setLoading(false)
      console.log(err)
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
                     <input required onChange={(e)=>{setChannelName(e.target.value)}} type="text" placeholder='Channel Name'/>
                     <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Your Email'/>
                     <input required onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Your Password' autoComplete='off'/>
                     <input required onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='Phone'/>
                     <input required onChange={fileHandler} type="file" placeholder='Logo'/>
                     {logo &&<img className="preview-image"src={imageUrl} alt="channel logo"/>}
                     <button onClick={submitHandler} type="submit">{loading && <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>}Submit</button>
                     <Link className='link' to='/login'>Login with your account</Link>
            </form>
    </div>
  )
}

export default Signup