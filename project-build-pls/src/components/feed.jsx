import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pb from '../lib/pb';
import PostDetail from './postdetail';
import Post from './posts';
import PopularScroller from './PopularScroller';
import Footer from './Footer';
import {
  Clock, Heart, MessageCircle, ArrowUp, Sparkles,
  Filter, Star, Flame, TrendingUp
} from 'lucide-react';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const sortOption = sortBy === 'newest' ? '-created' : 'title';
        const records = await pb.collection('posts').getFullList({
          sort: sortOption,
          expand: 'created_by',
        });
        setPosts(records);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-lg tracking-wider text-yellow-400">Loading the realm...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <PopularScroller />

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${selectedPostId || showPostModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {/* Header with filter */}
        <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-lg py-4 px-6 rounded-xl border-b-2 border-yellow-500">
          <div className="flex items-center space-x-1">
            <Flame className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">Trending Stories</h2>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm border border-yellow-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4 text-yellow-400" />
              <span>Filter</span>
            </motion.button>
            <motion.button
              onClick={() => setShowPostModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create a Story
            </motion.button>
          </div>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 top-16 bg-zinc-800 shadow-xl rounded-lg overflow-hidden z-20 border border-yellow-500/20"
              >
                <div className="p-2">
                  <button
                    className={`block w-full text-left px-4 py-2 rounded ${sortBy === 'newest' ? 'bg-yellow-500 text-black font-medium' : 'hover:bg-zinc-700 text-white'}`}
                    onClick={() => {
                      setSortBy('newest');
                      setFilterOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <TrendingUp className={`h-4 w-4 mr-2 ${sortBy === 'newest' ? 'text-black' : 'text-yellow-400'}`} />
                      Newest First
                    </div>
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 rounded ${sortBy === 'title' ? 'bg-yellow-500 text-black font-medium' : 'hover:bg-zinc-700 text-white'}`}
                    onClick={() => {
                      setSortBy('title');
                      setFilterOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Star className={`h-4 w-4 mr-2 ${sortBy === 'title' ? 'text-black' : 'text-yellow-400'}`} />
                      Alphabetical
                    </div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <EmptyState onCreate={() => setShowPostModal(true)} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800 p-5 rounded-xl shadow-xl transition-all border-l-4 border-yellow-500"
              >
                <h2 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.content}</p>

                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center text-gray-400 text-xs">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span>24</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>126</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-zinc-700 pt-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 mr-2 flex items-center justify-center text-xs font-bold text-black">
                      {post.expand?.created_by?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-xs text-gray-300">{post.expand?.created_by?.name || 'Unknown'}</span>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(post.created).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <BackToTopButton />
      </main>

      {/* PostDetail Modal */}
      <AnimatePresence>
        {selectedPostId && (
          <PostDetail postId={selectedPostId} onClose={() => setSelectedPostId(null)} />
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <Post onClose={() => setShowPostModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-10 text-center rounded-xl bg-zinc-900 border-2 border-dashed border-yellow-500/30"
    >
      <Sparkles className="h-12 w-12 mb-4 text-yellow-400" />
      <h3 className="text-2xl font-bold mb-2 text-white">No stories yet!</h3>
      <p className="text-gray-400 mb-6 max-w-md">Be the first to share your epic tale with the LoreVerse community.</p>
      <button
        onClick={onCreate}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-colors"
      >
        Create a Story
      </button>
    </motion.div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-xl z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default Feed;
