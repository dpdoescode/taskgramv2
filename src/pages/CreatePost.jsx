import { supabase } from '../client'
import './CreatePost.css'
import { useState } from 'react'

const CreatePost = () => {

    const [post, setPost] = useState({
        title: "",
        author: "",
        upvotes: 0,
        image_url: "",
        description: "",
    });

    const createPost = async (event) => {
        event.preventDefault() // prevent page reload.

        await supabase // 'await' used for async calls to supabase.
            .from ('posts') // 'from' used to specify table to use.
            .insert({ // indicates insertion operation (create part of CRUD operations)
                title: post.title,
                author: post.author,
                description: post.description,
                image_url: post.image_url,
            })
            .select() // returns database entry once inserted into the database.
        window.location = "/"


    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label> <br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image_url">Image URL</label> <br />
                <input type="text" id="image_url" name="image_url" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label> <br />
                <textarea 
                    name="description" 
                    rows="5" 
                    onChange={handleChange}>
                </textarea><br />
                <br />

                <input type="submit" value="submit" onClick={createPost} />
            
            </form>
        </div>
    )
}

export default CreatePost
