import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const UploadVideo = () => {
  const API = process.env.REACT_APP_API_BASE_URL
  const[title,setTitle] = useState(' ')
  const[description,setDescription] = useState(' ')
  const[category,setCategory] = useState(' ')
  const[tags,setTags] = useState(' ')
  const[video,setVideo] = useState(null)
  const[thumbnail,setThumbnail] = useState(null)
  const[loading,setLoading] = useState(false)
  const[selectThumbnail,setSelectedThumbnail] = useState(null)
  const videoHandler = (e)=>{
      setVideo(e.target.files[0])
  }
  const thumbnailHandler = (e)=>{
    setThumbnail(e.target.files[0])
    setSelectedThumbnail(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = (e)=>{
      e.preventDefault()
      setLoading(true)
      const formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('category',category)
      formData.append('tags',tags)
      formData.append('video',video)
      formData.append('thumbnail',thumbnail)

      axios.post(`${API}/video/upload-video`,formData,{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }
      })
      .then(res=>{
        setLoading(false)
        toast("Video Uploaded successfully")
        console.log(res.data)
      })
      .catch(err=>{
        setLoading(false)
        console.log(err)
        toast.error(err.response.data.error)
      })
  }
  return (
    <div className='upload-container'>
      <h2>Upload Video</h2>
      <form onSubmit = {submitHandler} className='upload-form'>
        <input onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title'/>
        <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description'/>
        <select onChange={(e)=>{setCategory(e.target.value)}}>
          <option value='science'>Science</option>
          <option value='technology'>Technology</option>
          <option value='motivation'>Motivation</option>
          <option value='project'>Projects</option>
          <option value='food'>Food</option>
          <option value='nature'>Nature</option>
          <option value='fashion'>Fashion</option>
          <option value='coding'>Coding</option>
        </select>
        <textarea onChange={(e)=>{setTags(e.target.value)}}placeholder='Tags'/>
        <label>Select Video</label>
        <input onChange={videoHandler} type="file"/>
        <label>Select Thumbnail</label>
        <input onChange={thumbnailHandler} type="file"/>
        {selectThumbnail && <img className='thumbnail' src={selectThumbnail} alt="thumbnail"/>}
        <button type="submit">{loading && <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>}Submit</button>
      </form>
    </div>
  )
}

export default UploadVideo