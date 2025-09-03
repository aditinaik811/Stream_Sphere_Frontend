import React, { useEffect, useState } from 'react'
import {useLocation } from 'react-router-dom'

const Video = () => {
    const [isExpanded,setExpanded] = useState(false)
    const API = process.env.REACT_APP_API_BASR_URL
    const location = useLocation()
    useEffect(()=>{
    console.log("hiii")
    console.log(location.state)
    },[])

    const words = location.state.myData.description.split(" ")


    const toggleView = ()=>{
        setExpanded(!isExpanded)
    }
  return (
    <div className='wrapper'>
        <div className='video-and-comment'>
                <video controls className='video-box'>
                    <source src={location.state.myData.videoUrl}></source>
                </video>
                <h3 className='video-title'>{location.state.myData.title}</h3>
                <p className='views'>{location.state.myData.views} views</p>
      
        <div className='channel-info'>
            <img className="channel-logo" src={location.state.myData.user_id.logoUrl} alt="channelLogo"/>
                <p>{location.state.myData.user_id.channelName}</p><span className='subscribers'><p>{location.state.myData.user_id.subscribers}</p></span>
                 <button className='subscribe-btn'>Subscribe</button>
            </div>
           <p className='description'>
  {!isExpanded
    ? location.state.myData.description.split(" ").slice(0, 30).join(" ") + "..."
    : location.state.myData.description}
  {location.state.myData.description.split(" ").length > 30 && (
    <span
      onClick={toggleView}
      className='more-less'
      style={{ color: 'blue', cursor: 'pointer' }}
    >
      {isExpanded ? ' view-less' : ' view-more'}
    </span>
  )}
</p>

     
       
    </div>
     
    <div className='suggested-videos'>

    </div>
</div>
  )
}

export default Video