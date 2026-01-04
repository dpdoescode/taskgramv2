import { supabase } from "../client";
// Edit Comment logic implemented in-place CommentFeed.jsx

const DeleteComment = ({ commentId, onDeleted }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (!error) {
      onDeleted();
    } else {
      console.error("Delete failed:", error);
    }
  };

  return (
    <button className="commentAction delete" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteComment;
