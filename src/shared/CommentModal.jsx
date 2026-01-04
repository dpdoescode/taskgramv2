import React from 'react';
import CommentFeed from "./CommentFeed";
import './CommentModal.css'

const CommentModal = ({ post, currentUser, onClose }) => {
    return (
        <div className="commentModalOverlay">
            <div className="commentModal">
                <div className="commentModalHeader">
                <h2>{post.title}</h2>
                <button onClick={onClose}>✕</button>
                </div>

                <CommentFeed postID={post.id} currentUser={currentUser} />
            </div>
        </div>
    );
};

export default CommentModal;