import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import more from './more.png'
import './Post.css'

const Post = (props) =>  {
  const [like, setLikes] = useState(0)

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('bulletin')
        .select('likes')
        .eq('id', props.id)
        .single()
      if (data) setLikes(data.likes || 0)
    }
    fetchLikes()
  }, [props.id])

  const updateCount = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newLikes = like + 1
    setLikes(newLikes)

    await supabase
      .from('bulletin')
      .update({ likes: newLikes })
      .eq('id', props.id)
  }

  return (
      <Link to={'/view/'+ props.id} style={{ textDecoration: 'none' }}>
        <div className="Post">
            <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
            <h2 className="title">{props.title}</h2>
            <img className="bandImage" alt="band" src={props.img} />
            <h3 className="bands">
              {Array.isArray(props.bands) ? props.bands.map((band, index) => (
                <div key={index}>{band}</div>)) : props.bands
            } </h3>
            <h3 className="time">{props.time}</h3>
            <button className="likeButton" onClick={updateCount} >💜 {like}</button>
        </div>
      </Link>
  );
};

export default Post