import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CommentList({ postId }) {
const [comments, setComments] = useState([])

async function fetchComments() {
const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true })
if (error) console.error(error)
else setComments(data || [])
}

useEffect(() => { fetchComments() }, [postId])

useEffect(() => {
const subscription = supabase
.channel(`comments:${postId}`)
.on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` }, payload => {
fetchComments()
})
.subscribe()

return () => { supabase.removeChannel(subscription) }
}, [postId])

if (!comments.length) return <div className="small">No comments yet</div>
return (
<div style={{ marginTop:8 }}>
{comments.map(c => (
<div key={c.id} style={{ padding:8, borderRadius:8, background:'#fbfcfe', marginBottom:8 }}>
<div className="small">{new Date(c.created_at).toLocaleString()}</div>
<div style={{ marginTop:4 }}>{c.text}</div>
</div>
))}
</div>
)
}