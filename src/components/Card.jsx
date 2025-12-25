import { useState } from 'react'
import './Card.css'
import more from './more.png'
import authorPfpBtn from './authorPfpBtn.png'
import likeBtn from './likeBtn.png'
import dislikeBtn from './dislikeBtn.png'
import commentBtn from './commentBtn.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client';


const Card = ({post}) =>  {
  const currentUser = { id: 'test-user-1' };

  const [likeCount, setLikeCount] = useState(post.likes_count || 0)
  const [dislikeCount, setDislikeCount] = useState(post.dislikes_count || 0)
  const [userVote, setUserVote] = useState(
    post.post_votes?.find(v => v.user_id === currentUser?.id)?.vote || 0
  );

  const handleVote = async (voteValue) => {
    if (!currentUser) return;
    if (userVote == voteValue) return; 

    if (voteValue == 1){
      setLikeCount(prev => prev + 1);
      if (userVote == -1){ // if currently disliked, reset disliked
        setDislikeCount(prev => prev - 1);
      }
    }

    else if (voteValue == -1){
      setDislikeCount(prev => prev + 1);
      if (userVote == 1){ // if currently liked, reset liked
        setLikeCount(prev => prev - 1);
      }
    }

    setUserVote(voteValue);

    await supabase
      .from('post_votes')
      .upsert({
        post_id: post.id,
        user_id: currentUser.id,
        vote: voteValue
      }, { onConflict: ['post_id', 'user_id'] });
  };





  return (
      <div className="Card">
          <Link to={'edit/'+ post.id}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link>
          <Link to={'profile/' + post.user_id}> 
            <img className="authorPfpButton" alt="profile picture for the author of the post." src={authorPfpBtn}/>
          </Link>
          
          <div className="imageContainer">
            {post.image_url ? (
              <img className="image_url" src={post.image_url} alt={post.title}/>
            ) : (
              <div className="image_placeholder">No Image</div>
            )}
          </div>
          <h2 className="title">{post.title}</h2>
          <h3 className="author">{"by " + post.author}</h3>
          <p className="description">{post.description}</p>
          <div className="buttonsContainer">
            <button className="likeButton" onClick={() => handleVote(1)}> 
              <img src={likeBtn} alt="like button"/> {likeCount}
            </button>
            <button className="dislikeButton" onClick={() => handleVote(-1)}> 
              <img src={dislikeBtn} alt="dislike button"/> {dislikeCount}
            </button>
            <button className="commentButton">
              <img src={commentBtn} alt="comment button"/> 1
            </button>
          </div>
      </div>
  );
};

export default Card