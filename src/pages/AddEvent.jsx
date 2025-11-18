import { useState } from 'react'
import { supabase } from '../client'
import './AddEvent.css'

const AddEvent = () => {

    const [event, setEvent] = useState({title: "", bands: {"<band_name>": ""}, time: "", address: "", price: "", parking: "", description: ""})

    const addEvent = async (event) => {
        event.preventDefault()

        await supabase
            .from('bulletin')
            .insert({title: event.title, bands: event.bands, time: event.time, address: event.address, price: event.price, parking: event.parking, description: event.description})
            .select()
        
        window.location = "/"
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setEvent( (prev) => {
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
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="bands">Band(s)</label><br />
                <input type="text" id="bands" name="bands" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="time">Time</label><br />
                <input type="text" id="time" name="time" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="address">Address</label><br />
                <input type="text" id="address" name="address" onChange={handleChange} /><br />
                <br/> 

                <label htmlFor="price">Price</label><br />
                <input type="text" id="price" name="price" onChange={handleChange} /><br />
                <br/>                       

                <label htmlFor="parking">Parking</label><br />
                <textarea rows="3" cols="50" id="parking" name="parking" onChange={handleChange}>
                </textarea>
                <br />

                <label htmlFor="secret">Description</label><br />
                <textarea rows="5" cols="50" id="secret" name="secret" onChange={handleChange}>
                </textarea>
                <br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default AddEvent