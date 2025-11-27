import { supabase } from '../client'

const EditPost = () => {
    
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













    return (
        <div>
            <input type="submit" value="Submit" onClick={updatePost} />

        </div>
    )


}

export default EditPost