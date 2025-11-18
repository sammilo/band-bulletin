import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './DetailEvent.css'

const DetailEvent = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('bulletin')
                .select('*')
                .eq('id', id)
                .single()

            if (data) {
                setPost(data)
            }
            setLoading(false)
        }
        fetchPost()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return <div>Event Not Found</div>
    }

    return (
        <div className="DetailEvent">
            <div className="postDetails">
                <h2>{post.title}</h2>
                <p><strong>Band(s):</strong> {post.bands}</p>
                <p><strong>Time:</strong> {post.level}</p>
                <p><strong>Address:</strong> {post.address}</p>
                <p><strong>Price:</strong> {post.class}</p>
                <p><strong>Parking:</strong> {post.story}</p>
                <p><strong>Description:</strong> {post.secret}</p>
            </div>
        </div>
    )
}

export default DetailEvent