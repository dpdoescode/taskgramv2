import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
return (
<div className="post-card">
<Link to={`/post/${post.id}`}>
<div style={{ display:'flex', justifyContent:'space-between' }}>
<div>
<h3 style={{ margin:0 }}>{post.title}</h3>
<div className="small">{new Date(post.created_at).toLocaleString()}</div>
</div>
<div style={{ textAlign:'right' }}>
<div className="small">Upvotes</div>
<div style={{ fontWeight:600 }}>{post.upvotes ?? 0}</div>
</div>
</div>
</Link>
</div>
)
}