import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './DetailEvent.css'

const DetailEvent = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState('')

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

    useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

        if (data) {
            setComments(data)
        }
    }
        fetchComments()
    }, [id])

    const addComment = async (e) => {
        e.preventDefault()
        if (!commentInput.trim()) return

        const { data, error } = await supabase
            .from('comments')
            .insert({ post_id: id, content: commentInput })
            .select()

        if (data) {
            setComments([...comments, data[0]])
            setCommentInput('')
        }
    }

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
                <img className="bandImage" alt="band" src={post.img} />
                <p className="bands"><strong>Band(s):</strong> {Array.isArray(post.bands) ? post.bands.join(', ') : post.bands}</p>
                <p className="time"><strong>Date & Time:</strong> {post.time}</p>
                <p className="address"><strong>Address:</strong> {post.address}</p>
                <p className="price"><strong>Price:</strong> ${post.price}</p>
                <p><strong>Parking:</strong> {post.parking}</p>
                <p><strong>Description:</strong> {post.description}</p>
            </div>
            <div className="commentsContainer">
                <h3> 💬 Comments</h3>
                <div className="commentsList">
                    {comments.length > 0 ? (
                        comments.map((c) => <p key={c.id}>{c.content}</p>)
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>

                <form onSubmit={addComment} className="commentForm">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}

export default DetailEvent