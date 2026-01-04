import React, {useEffect, useState } from 'react';
import './App.css';
import { useRoutes, useLocation, Link } from 'react-router-dom'
import { supabase } from './client';

import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ReadPosts from './pages/ReadPosts'
import Profile from './pages/Profile';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';

import filterBtn from './components/filterBtn.png'
import createPostBtn from './components/createPostBtn.png'


const App = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Fetch session & subscribe to auth changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setLoading(false);
    })

    return () => subscription.unsubscribe()
    }, [])


    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    let element = useRoutes([ // React router function that selects correct screen based on URL
        {
            path: "/", 
            element:<ReadPosts session={session}/> // show ReadPosts
        },
        {
            path:"/edit/:id",
            element:<EditPost /> // /edit/whateverid -> show EditPost
        },
        {
            path:"/new", 
            element:<CreatePost /> // show CreatePost
        },
        {
            path:"/profile/:id",
            element: <Profile session={session} /> // /profile/whateverid -> show Profile
        },
        {
            path:"/create-event",
            element: <CreateEvent session={session} /> // show CreateEvent
        }
        
    ]);

    // --- Handle Supabase loading ---
    if (loading) return <div>Loading...</div>;

    // --- LOGIN SCREEN ---
    if (!session) {
        return (
            <Login />
        )
    }

    // Setup startup display
    return (
        <div className="App">
            <div className="header">
                <h1>TaskGram</h1>

                <ul>
                    <Link to="/">
                        <button className="headerBtn"> Leaderboard </button>
                    </Link>

                    <Link to="/new">
                        <button className="headerBtn"> Create Post </button>
                    </Link>

                    <Link to="/profile/:id">
                        <button className="headerBtn"> Profile </button>
                    </Link>

                    <Link to="/create-event">
                        <button className="headerBtn">Create Event</button>
                    </Link>

                    <button className="signOutBtn" onClick={signOut}>Sign Out</button>
                </ul>

            </div>

            {location.pathname === "/" ? (
                // Main posts page layout
                <div className="content">
                <div className="sidebar">
                    <button className="sidebarBtn"><img src={createPostBtn} /></button>
                    <button className="sidebarBtn"><img src={filterBtn} /></button>
                </div>
                <div className="posts-container">{element}</div>
                </div>
            ) : (
                // Other pages take full width
                <div className="full-page-container">{element}</div>
            )}
        </div>
    );
};

export default App