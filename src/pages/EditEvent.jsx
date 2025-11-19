import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import { useState } from 'react'
import './EditEvent.css'

const EditEvent = ({data}) => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", img: "", bands: "", time: "", address: "", price: "", parking: "", description: ""})

    const updatePost = async (event) => {
        event.preventDefault()

        const updateData = {}

        if (post.bands) {
            updateData.bands = post.bands.split(',').map(b => b.trim())
        }

        if (post.title) updateData.title = post.title
        if (post.img) updateData.img = post.img
        if (post.time) updateData.time = post.time
        if (post.address) updateData.address = post.address
        if (post.price) updateData.price = post.price
        if (post.parking) updateData.parking = post.parking
        if (post.description) updateData.description = post.description

        await supabase
            .from('bulletin')
            .update(updateData)
            .eq('id', id)

        window.location = "/"
    }

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('bulletin')
            .delete()
            .eq('id', id)

        window.location = "/"
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="img">Image URL</label><br />
                <input type="text" id="img" name="img" value={post.img} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="bands">Band(s)</label><br />
                <input type="text" id="bands" name="bands" value={post.bands} placeholder="Band1, Band2, Band3" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="time">Date & Time</label><br />
                <input type="text" id="time" name="time" value={post.time} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="address">Address</label><br />
                <input type="text" id="address" name="address" value={post.address} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="price">Price</label><br />
                <input type="text" id="price" name="price" value={post.price} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="parking">Parking</label><br />
                <textarea rows="5" cols="50" id="parking" name="parking" value={post.parking} onChange={handleChange}>
                </textarea>
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br />

                <input className="submitButton" type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditEvent