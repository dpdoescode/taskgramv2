import { supabase } from '../client'
import { useState, useEffect } from 'react'
import Card from '../components/Card'

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([])

    useEffect (() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('posts')
                .select() // return database entires once inserted into database. return value -> data
                .order('created_at', {ascending: true }) // sort based on created_at, object w/ option params

            setPosts(data)
        }
        // database posts from Supabase
            // call the async function to fetch posts from Supabase
        fetchPosts()
        // .then(() => {
        //     if (posts.length === 0){
        //     // hard-coded posts from App.jsx
        //         setPosts(props.data) // updates state variable 'posts' with data passed from parent component.
        //     }

        
    }, [props]) //dependency array includes props to ensure effect runs when props change.

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0
                    ? [... posts] // done to prevent mutating array posts (we create copy)
                    .sort((a,b) => a.id - b.id) // ascending order, (+) = b before a; (-) = a before b; (0) = no change
                    .map((post, index) => ( // applies attributes to each Card
                        <Card
                            key = {post.id}
                            id = {post.id}
                            title = {post.title}
                            author = {post.author}
                            description = {post.description}
                            image_url = {post.image_url}
                            upvotes = {post.upvotes}
                        />
                    )) : <h2>{'No Posts Yet... Become the first!'}</h2>
            }
        </div>
    )
}

export default ReadPosts