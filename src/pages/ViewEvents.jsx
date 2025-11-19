import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Post from '../components/Post'
import './ViewEvents.css'

const ViewEvents = (props) => {

    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState('') 

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
    
     const filteredPosts = posts.filter(post => {
        if (!searchQuery) return true 
        return post.bands.some(band =>
            band.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    return (
        <>
            <div className="searchContainer">
                <input 
                className="searchBar" 
                type="search" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="ViewEvents">
                {filteredPosts && filteredPosts.length > 0 ?
                    [...filteredPosts]
                        .sort((a, b) => b.id - a.id)
                        .map((post) => 
                            <Post 
                                key={post.id}
                                id={post.id} 
                                title={post.title}
                                img={post.img}
                                bands={post.bands}
                                time={post.time}
                            />
                        ) 
                    : 
                    <h2 id="default-text">{'No Events 💀'}</h2>
                }
            </div>
        </>
    )
}

export default ViewEvents