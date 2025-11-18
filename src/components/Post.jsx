import { Link } from 'react-router-dom'
import { useState } from 'react'
import more from './more.png'
import './Post.css'

const Post = (props) =>  {

  const [like, setLikes] = useState(0)
  const updateCount = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setLikes((like) => like + 1)
  }

  return (
      <Link to={'/view/'+ props.id} style={{ textDecoration: 'none' }}>
        <div className="Post">
            <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
            <h3 className="title">{props.title}</h3>
            <h2 className="bands">{props.bands}</h2>
            <h3 className="time">{props.time}</h3>
            <h3 className="address">{props.address}</h3>
            <h3 className="price">{"$" + props.price + "entry"}</h3>
            <p className="parking">{props.parking}</p>
            <p className="description">{props.description}</p>
            <button className="likeButton" onClick={updateCount} >💜 {like}</button>
        </div>
      </Link>
  );
};

export default Post