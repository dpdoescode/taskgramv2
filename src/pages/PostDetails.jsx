import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import CommentList from '../shared/CommentList'
import CommentForm from '../shared/CommentForm'

export default function PostPage() {
  const { id } = useParams()      // get post ID from route
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch post from Supabase
  const fetchPost = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      setPost(null)
    } else {
      setPost(data)
    }
    setLoading(false)
  }

  // Fetch post on mount & subscribe to realtime updates
  useEffect(() => {
    fetchPost()

    // Realtime subscription
    const subscription = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `id=eq.${id}` },
        payload => {
          fetchPost()
        }
      )
      .subscribe()

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [id])

  // Upvote post
  const handleUpvote = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: (post.upvotes ?? 0) + 1 })
      .eq('id', id)

    if (error) return alert(error.message)
    fetchPost()
  }

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) return alert(error.message)
    navigate('/') // go back to home after delete
  }

  // Loading / not found states
  if (loading) return <div className="card">Loading…</div>
  if (!post) return <div className="card">Post not found</div>

  // Render post
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>{post.title}</h2>
          <div className="small">{new Date(post.created_at).toLocaleString()}</div>
        </div>
        <div className="controls">
          <button className="button" onClick={handleUpvote}>
            Upvote ({post.upvotes})
          </button>
          <button style={{ marginLeft: 8 }} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="post"
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
        )}
        {post.content && <p style={{ marginTop: 8 }}>{post.content}</p>}
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Comments</h4>
        <CommentList postId={id} />
        <CommentForm postId={id} onCommentAdded={fetchPost} />
      </div>
    </div>
  )
}
