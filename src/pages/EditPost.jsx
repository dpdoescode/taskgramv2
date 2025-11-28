import { supabase } from '../client'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'

const EditPost = ({data}) => {
    const {id} = useParams()
    const [post, setPost] = useState({
        id:null, 
        title: "", 
        author: "",
        description: "", 
        image_url: "", 
        upvotes: 0
    });

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()

        await supabase 
            .from('posts') // specify table
            .update({ // update part of the CRUD operations.
                title: post.title,
                author: post.author,
                description: post.description,
                image_url: post.image_url,
            })
            .eq('id', id) // match only rows where column is equal to value. 
                          // ensures row w/ matching id of current post is updated in the database.
        window.location = "/" // redirects browser to root URL (homepage)

    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('posts')
            .delete() // indicates delete operation in CRUD.
            .eq('id', id) // ensures only the post with the matching id is deleted.
        window.location = "/"

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
                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )


}

export default EditPost