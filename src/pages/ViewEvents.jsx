import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Post from '../components/Post'
import './ViewEvents.css'

const ViewEvents = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
                .from('bulletin')
                .select()
                .order('created_at', { ascending: false })
        
            setPosts(data)
        }
        fetchPost()
    }, [props])
    
    return (
        <div className="ViewEvents">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => b.id - a.id)
                .map((post,index) => 
                    <Post 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        bands={post.bands}
                        time={post.time}
                        address={post.address}
                        price={post.price}
                        parking={post.parking}
                        description={post.description}
                    />
                ) : <h2 id="default-text">{'No Events 💀'}</h2>
            }
        </div>  
    )
}

export default ViewEvents