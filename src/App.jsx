import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ReadPosts from './pages/ReadPosts'
import { Link } from 'react-router-dom'


const App = () => {

    let element = useRoutes([
        {
            


        }
    ]);

    // Setup startup display
    return (
        <div classname="App">

            <div classname="header">
                <Link to="/"><button classname="headerBtn"> Leaderboard </button></Link>
                

            </div>


        </div>
    )



}

export default App