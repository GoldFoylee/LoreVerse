import React, { useEffect, useState } from 'react';
import pb from '../lib/pb'; // Make sure this is your configured PocketBase instance
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

function PostDetail({ postId, onClose }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await pb.collection('posts').getOne(postId, { expand: 'created_by' });
        setPost(postData);

        const commentData = await pb.collection('comments').getFullList({
          filter: `post_id="${postId}"`,
          expand: 'user_id',
          sort: 'created',
        });
        setComments(commentData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch post or comments');
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userId = pb.authStore.model?.id;
    if (!userId) {
      setError('Login required to comment.');
      return;
    }

    try {
      await pb.collection('comments').create({
        content: newComment,
        post_id: postId,
        user_id: userId,
      });

      setNewComment('');
      const updatedComments = await pb.collection('comments').getFullList({
        filter: `post_id="${postId}"`,
        expand: 'user_id',
        sort: 'created',
      });
      setComments(updatedComments);
    } catch (err) {
      console.error(err);
      setError('Failed to post comment.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-3xl w-full bg-gray-900 rounded-lg shadow-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Post content */}
        {post && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-yellow-400">{post.title}</h1>
            <p className="text-gray-300 mb-6">{post.content}</p>
          </>
        )}

        {/* Comment input */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            className="w-full bg-gray-800 text-white p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold transition-colors"
          >
            Comment
          </button>
        </form>

        {/* Comments list */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="bg-gray-800 p-4 rounded mb-3">
                <p className="font-semibold text-white mb-1">
                  {c.expand?.user_id?.name || 'Unknown User'}
                </p>
                <p className="text-gray-300">{c.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PostDetail;
