import React, { useEffect, useState } from 'react'
import PostForm from '../shared/PostForm'
import PostFeed from '../shared/PostFeed'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
const [posts, setPosts] = useState([])
const [search, setSearch] = useState('')
const [sortBy, setSortBy] = useState('time')

async function fetchPosts() {
const order = sortBy === 'time' ? { column: 'created_at', ascending: false } : { column: 'upvotes', ascending: false }
const { data, error } = await supabase
.from('posts')
.select('*')
.order(order.column, { ascending: order.ascending })

if (error) console.error(error)
else setPosts(data || [])
}

useEffect(() => { fetchPosts() }, [sortBy])

// realtime subscription
useEffect(() => {
const subscription = supabase
.channel('public:posts')
.on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
// simple handler: refetch list on any change
fetchPosts()
})
.subscribe()

return () => { supabase.removeChannel(subscription) }
}, [sortBy])

return (
<div>
<div className="card">
<PostForm onCreate={fetchPosts} />
</div>

<div style={{ height: 12 }} />

<div className="card" style={{ marginTop: 12 }}>
<div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
<div className="controls">
<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
<option value="time">Sort: Newest</option>
<option value="upvotes">Sort: Top</option>
</select>
<input className="search" placeholder="Search title..." value={search} onChange={e => setSearch(e.target.value)} />
</div>
<div className="small">Total posts: {posts.length}</div>
</div>

<PostFeed posts={posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))} />
</div>
</div>
)
}