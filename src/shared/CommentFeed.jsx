import React, { useEffect, useState } from 'react';
import { supabase } from "../client";
import './CommentFeed.css';
import DeleteComment from "./DeleteComment";

import likeBtn from '../components/likeBtn.png';
import dislikeBtn from '../components/dislikeBtn.png';
import defaultAvatar from './defaultAvatar.png';

const CommentFeed = ({postID, currentUser}) => {
    const [comments, setComments] = useState([]); // holds list of comments
    const [editingComment, setEditingComment] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('comments')
            .select(`
                *, 
                comment_votes(vote, user_id),
                profiles(id, username, avatar)`)
            .eq('post_id', postID)
            .order('created_at', {ascending: true});

        if (error) {
            console.error("Error fetching comments: ", error);
        }
        else {
            setComments(data || []);
        }
        setLoading(false);
    };

    useEffect( () => {
        fetchComments()
    }, [postID]);

    const handleVote = async (commentID, voteValue) => {
        const comment = comments.find(c => c.id === commentID);
        const userVote = comment.comment_votes?.find(v => v.user_id === currentUser.id)?.vote || 0;

        if (voteValue === userVote){
            return;
        }

        await supabase
            .from('comment_votes')
            .upsert(
                {
                    comment_id : commentID,
                    user_id : currentUser.id,
                    vote : voteValue,
                },
                {
                    onConflict : ['user_id', 'comment_id']
                }
            );
        fetchComments();
    };

    const ensureProfileExists = async (user) => {
        const { data: profile } = await supabase
            .from('profiles')
            .select()
            .eq('id', user.id)
            .single();

        if (!profile) {
            await supabase.from('profiles').insert({
            id: user.id,
            username: user.user_metadata?.name || 'Unknown',
            avatar: user.user_metadata?.picture || null
            });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser?.id) return;

    if (editingComment) {
        // EDIT MODE
        const { error } = await supabase
        .from("comments")
        .update({ content: commentText })
        .eq("id", editingComment.id);

        if (!error) {
        setEditingComment(null);
        setCommentText("");
        fetchComments();
        } else {
        console.error("Edit failed:", error);
        }

    } else {
        // CREATE MODE
        const { error } = await supabase.from("comments").insert({
        post_id: postID,
        user_id: currentUser.id,
        content: commentText,
        });

        if (!error) {
        setCommentText("");
        fetchComments();
        } else {
        console.error("Post failed:", error);
        }
    }
    };

    if (loading) return <p>Loading Comments...</p>

    return (
    <div className="CommentFeed">
        <h3>Comments</h3>
        <div className="commentList">
        {comments.map(comment => {
            const vote = comment.comment_votes?.find(v => v.user_id === currentUser?.id)?.vote || 0;
            return (
            <div key={comment.id} className="commentCard">
                <div className="commentProfile">
                    <img
                    className="commentAvatar"
                        src={comment.profiles?.avatar || defaultAvatar}
                        alt={comment.profiles?.username || 'User Avatar'}
                    />
                    <span className="commentUsername">{comment.profiles?.username || 'User'}</span>

                    {comment.user_id === currentUser?.id && (
                    <div className="commentActions">
                        <button
                            className="commentAction"
                            onClick={() => {
                            setEditingComment(comment);
                            setCommentText(comment.content);
                            }}
                        >
                            Edit
                        </button>
                        

                        <DeleteComment
                            commentId={comment.id}
                            onDeleted={fetchComments}
                        />
                    </div>
                    )}

                </div>

                

                <p className="commentText">{comment.content}</p>

                <div className="commentVotes">
                    <button
                    className={`commentUpvote ${vote === 1 ? 'voted' : ''}`}
                    onClick={() => handleVote(comment.id, 1)}
                    >
                    <img src={likeBtn}/> {comment.comment_votes?.filter(v => v.vote === 1).length || 0}
                    </button>
                    <button
                    className={`commentDownvote ${vote === -1 ? 'voted' : ''}`}
                    onClick={() => handleVote(comment.id, -1)}
                    >
                    <img src={dislikeBtn}/> {comment.comment_votes?.filter(v => v.vote === -1).length || 0}
                    </button>
                </div>
            </div>
            );
        })}
        </div>

        <form className="addCommentForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={
                editingComment ? "Edit your comment..." : "Write a comment..."
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />

            <button type="submit">
                {editingComment ? "Save" : "Post"}
            </button>

            {editingComment && (
                <button
                type="button"
                className="cancelEdit"
                onClick={() => {
                    setEditingComment(null);
                    setCommentText("");
                }}
                >
                Cancel
                </button>
            )}
            </form>

    </div>
    );
};

export default CommentFeed;