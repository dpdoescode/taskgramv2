import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ReadPosts from './pages/ReadPosts'
import { Link } from 'react-router-dom'


const App = () => {

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

    let element = useRoutes([
        {
            path: "/",
            element:<ReadPosts data={posts}/>
        },
        {
            path:"/edit/:id",
            element:<EditPost data={posts} />
        },
        {
            path:"/new",
            element:<CreatePost />
        }
    ]);

    // Setup startup display
    return (
        <div classname="App">

            <div classname="header">
                <h1>Hello World!</h1>
                <Link to="/">
                    <button classname="headerBtn"> Leaderboard </button>
                </Link>

                <Link to="/new">
                    <button classname="headerBtn"> Create Post </button>
                </Link>

            </div>
            {element}
        </div>
    )
}

export default App