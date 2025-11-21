import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CommentForm({ postId, onCommentAdded }) {
const [text, setText] = useState('')
const [loading, setLoading] = useState(false)

async function handleSubmit(e) {
e.preventDefault()
if (!text.trim()) return
setLoading(true)
const { error } = await supabase.from('comments').insert([{ post_id: postId, text }])
setLoading(false)
if (error) return alert(error.message)
setText('')
onCommentAdded?.()
}

return (
<form onSubmit={handleSubmit} style={{ marginTop:8 }}>
<div style={{ display:'flex', gap:8 }}>
<input className="input" placeholder="Write a comment..." value={text} onChange={e=>setText(e.target.value)} />
<button className="button" type="submit" disabled={loading}>{loading ? 'Posting...' : 'Comment'}</button>
</div>
</form>
)
}