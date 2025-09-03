import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyVideos = () => {
  const[myVideos,setMyVideos] = useState([])
  const API = process.env.REACT_APP_API_BASE_URL
  const navigate = useNavigate();

  useEffect(()=>{
      getMyVideos()
  },[])
  
  const getMyVideos = ()=>{
     axios.get(`${API}/video/my-videos`,{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }
      })
      .then(res=>{
        console.log(res.data.allVideos)
        setMyVideos(res.data.allVideos)
      })
      .catch(err=>{
        console.log(err)

      })
  }
  return (
    <div className='my-videos-container'>
      <table className='videos-table'>
        <thead>
          <tr>
            <th>Videos</th>
            <th>Title</th>
            <th>Date</th>
            <th>Views</th>
            <th>Like Vs Dislike</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            myVideos.map(video=>(
              <tr key={video._id} onClick={()=>{navigate('/video',{state:{myData:video}})}}>
                <td><img src={video.thumbnailUrl} alt="thumbnail"/></td>
                <td>{video.title}</td>
                <td>{video.createdAt}</td>
                <td>{video.views}</td>
                <td>{video.likes}/{video.dislikes}</td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default MyVideos