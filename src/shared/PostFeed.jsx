import React from 'react'
import PostCard from './PostCard'

export default function PostFeed({ posts }) {
if (!posts.length) return <div style={{ padding:12 }}>No posts yet</div>
return (
<div>
{posts.map(post => (
<PostCard key={post.id} post={post} />
))}
</div>
)
}