import { useState } from 'react'
import { supabase } from '../client'
import defaultImg from '../assets/tapes.png'
import './AddEvent.css'

const AddEvent = () => {
    const [post, setPost] = useState({
        title: "", 
        img: "", 
        bands: [], 
        time: "", 
        address: "", 
        price: "", 
        parking: "", 
        description: ""
    });

    const addEvent = async (e) => {
        e.preventDefault()

        const imageToUpload = post.img.trim() === "" ? defaultImg : post.img;
        const bandsArray = post.bands.split(',').map(band => band.trim());

        await supabase
            .from('bulletin')
            .insert({
                title: post.title, 
                img: imageToUpload, 
                bands: bandsArray, 
                time: post.time, 
                address: post.address, 
                price: post.price, 
                parking: post.parking, 
                description: post.description
            })
            .select()
        
        window.location = "/"
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={addEvent}>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" name="title" onChange={handleChange} required/><br />
                <br/>

                <label htmlFor="img">Image URL</label><br />
                <input type="text" id="img" name="img" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="bands">Band(s)</label><br />
                <input type="text" id="bands" name="bands" placeholder="Band1, Band2, Band3" onChange={handleChange} required/><br />
                <br/>

                <label htmlFor="time">Date & Time</label><br />
                <input type="text" id="time" name="time" onChange={handleChange} required/><br />
                <br/>

                <label htmlFor="address">Address</label><br />
                <input type="text" id="address" name="address" onChange={handleChange} required/><br />
                <br/> 

                <label htmlFor="price">Price</label><br />
                <input type="text" id="price" name="price" onChange={handleChange} required/><br />
                <br/>                       

                <label htmlFor="parking">Parking</label><br />
                <textarea rows="3" cols="50" id="parking" name="parking" onChange={handleChange} required>
                </textarea>
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange} required>
                </textarea>
                <br/>

                <input type="submit" className="submitBtn" value="Submit"/>
            </form>
        </div>
    )
}

export default AddEvent