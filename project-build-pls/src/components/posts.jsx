import React, { useState } from 'react';
import pb from '../lib/pb';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

function Post({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setError('');

    const userId = pb.authStore.model?.id;
    if (!userId) {
      setError('You must be logged in to post.');
      return;
    }

    const data = {
      title: form.title,
      content: form.content,
      created_by: userId,
    };

    try {
      await pb.collection('posts').create(data);
      alert('Post created successfully!');
      setForm({ title: '', content: '' });
      onClose(); // Close the modal
    } catch (err) {
      console.error(err);
      setError('Failed to create post.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <form
        onSubmit={handlePost}
        className="relative bg-zinc-900 text-white rounded-lg shadow-2xl w-full max-w-xl p-8 space-y-4 border border-yellow-500/40"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-bold text-center text-yellow-400">Create a New Theory</h2>

        <input
          type="text"
          name="title"
          placeholder="Title of your theory"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-black border border-yellow-500/30 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
        />

        <textarea
          name="content"
          placeholder="Share your detailed theory..."
          value={form.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 bg-black border border-yellow-500/30 text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
        />

        {error && <p className="text-yellow-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition-colors"
        >
          Post
        </button>
      </form>
    </motion.div>
  );
}

export default Post;
