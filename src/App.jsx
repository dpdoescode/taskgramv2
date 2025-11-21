import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'

export default function App() {
return (
<div className="container">
<header className="header">
<h1>TaskGram</h1>
<nav className="controls">
<Link to="/">Home</Link>
<a href="#" onClick={e => { e.preventDefault(); alert('Auth not included in demo — use Supabase auth or mock user ID.') }}>Profile</a>
</nav>
</header>

<main style={{ marginTop: 20 }}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/post/:id" element={<PostDetails />} />
</Routes>
</main>
</div>
)
}