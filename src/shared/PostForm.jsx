import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function PostForm({ onCreate }) {
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [imageUrl, setImageUrl] = useState('')
const [loading, setLoading] = useState(false)

async function handleSubmit(e) {
e.preventDefault()
if (!title.trim()) return alert('Title is required')
setLoading(true)

// NOTE: in a real app, use auth.user().id. For demo, allow posts without user.
const { data, error } = await supabase.from('posts').insert([
{ title, content: content || null, image_url: imageUrl || null }
])

setLoading(false)
if (error) return alert(error.message)
setTitle(''); setContent(''); setImageUrl('')
onCreate?.()
}

return (
<form onSubmit={handleSubmit} className="">
<div style={{ display:'flex', gap:10 }}>
<input className="input" placeholder="Post title (required)" value={title} onChange={e=>setTitle(e.target.value)} />
<button className="button" type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post'}</button>
</div>

<div style={{ marginTop:8 }}>
<textarea className="input" rows={3} placeholder="Additional content (optional)" value={content} onChange={e=>setContent(e.target.value)} />
</div>

<div style={{ marginTop:8 }}>
<input className="input" placeholder="Image URL (optional)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
</div>
</form>
)
}