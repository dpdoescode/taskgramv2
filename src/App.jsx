import React, {useEffect, useState } from 'react';
import './App.css';
import { useRoutes, useLocation, Link } from 'react-router-dom'
import { supabase } from './client';

import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ReadPosts from './pages/ReadPosts'
import Profile from './pages/Profile';

import filterBtn from './components/filterBtn.png'
import createPostBtn from './components/createPostBtn.png'


const App = () => {
    const location = useLocation();
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch session & subscribe to auth changes
    useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
        setSession(data.session)
        setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setLoading(false);
    })

    return () => subscription.unsubscribe()
    }, [])


    // --- Handle Supabase loading ---
    if (loading) return null

    const googleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: 
                { scopes: 'https://www.googleapis.com/auth/calendar' },
        });
        if (error) {
            console.error('Google sign-in error:', error);
            alert('Error logging in with Google!');
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

    const posts = [
        {'id':'1', 
        'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
        'author':'Harvey Milian', 
        'image_url':'https://www.mensfitness.com/.image/w_3840,q_auto:good,c_limit/MjEzMTE1NTk4MzU0MjYxODUz/shot-of-a-muscular-young-man-exercising-with-a-kettlebell-in-a-gym.jpg',
        'description': descr},
        {'id':'2', 
        'title': 'Love Lock in Paris 🔒',
        'author':'Beauford Delaney', 
        'image_url' : 'https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/480/1280/90/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/wdw/things-to-do/attractions/dinosaur-00.jpg',
        'description':descr},
        {'id':'3', 
        'title': 'Wear Pink on Fridays 🎀',
        'author':'Onika Tonya', 
        'image_url' : 'https://www.baystatehealth.org/-/media/images/foundation/events/rays-of-hope-600.jpg?rev=0adcc747d6da4aba8e736f940b3dff5c',
        'description':descr},
        {'id':'4', 
        'title': 'Adopt a Dog 🐶',
        'author':'Denise Michelle', 
        'image_url' : 'https://www.hartz.com/wp-content/uploads/2022/03/perfect-dog-for-family-1.jpg',
        'description':descr},
    ]

    let element = useRoutes([ // React router function that selects correct screen based on URL
        {
            path: "/", 
            element:<ReadPosts data={posts}/> // show ReadPosts
        },
        {
            path:"/edit/:id",
            element:<EditPost data={posts} /> // /edit/whateverid -> show EditPost
        },
        {
            path:"/new", 
            element:<CreatePost /> // show CreatePost
        },
        {
            path:"/profile/:id",
            element: <Profile data={posts} /> // /profile/whateverid -> show Profile
        }
    ]);

    if (loading) return <div>Loading...</div>;

    // --- LOGIN SCREEN ---
    if (!session) {
        return (
        <div className="auth-screen">
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>
        )
    }

    // Setup startup display
    return (
        <div className="App">
            <div className="header">
                <h1>TaskGram</h1>

                <div className="auth">
                    <h2>Welcome, {session.user.email}</h2>
                    <button onClick={signOut}>Sign Out</button>
                </div>
                
                <Link to="/">
                    <button className="headerBtn"> Leaderboard </button>
                </Link>

                <Link to="/new">
                    <button className="headerBtn"> Create Post </button>
                </Link>

                <Link to="/profile/:id">
                    <button className="headerBtn"> Profile </button>
                </Link>

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