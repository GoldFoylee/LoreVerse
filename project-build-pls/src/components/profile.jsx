import React, { useEffect, useState } from 'react';
import pb from '../lib/pb';
import { motion } from 'framer-motion';
import { Book, BookOpen, Award, MessageCircle, Heart, Bookmark, FileText, Edit, Tv } from 'lucide-react';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const userId = pb.authStore.model?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const userData = await pb.collection('users').getOne(userId);
        setUser(userData);

        const userPosts = await pb.collection('posts').getFullList({
          filter: `created_by="${userId}"`,
          sort: '-created',
        });
        setPosts(userPosts);

        const userComments = await pb.collection('comments').getFullList({
          filter: `user_id="${userId}"`,
          sort: '-created',
        });
        setComments(userComments);
      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Star background animations
  const stars = Array(50).fill().map((_, i) => {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    
    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ 
          width: size, 
          height: size, 
          top: `${top}%`, 
          left: `${left}%` 
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    );
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0B1E] text-[#F2E9E4]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [0.8, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg flex flex-col items-center"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-[#6C4AB6] flex items-center justify-center shadow-lg shadow-[#6C4AB6]/30">
            <BookOpen className="w-8 h-8 text-[#F2E9E4]" />
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-[#9B7EDE] to-[#F2E9E4] bg-clip-text text-transparent">
            Summoning your profile...
          </p>
        </motion.div>
      </div>
    );
  }

  // Not found or not logged in state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0B1E] text-[#9B7EDE]">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-6xl"
          >
            🔮
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-medium"
          >
            User not found or not logged in.
          </motion.p>
        </div>
      </div>
    );
  }

  // Format the post type based on content
  const getPostType = (post) => {
    // This is a placeholder logic - adjust according to your actual post data structure
    if (post.title?.toLowerCase().includes('anime') || post.content?.toLowerCase().includes('anime')) {
      return 'Anime';
    } else if (post.title?.toLowerCase().includes('manga') || post.content?.toLowerCase().includes('manga')) {
      return 'Manga';
    } else {
      return 'Book';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0B1E] text-[#F2E9E4] relative overflow-x-hidden">
      {/* Magical Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0B1E] via-[#291C51] to-[#0F0B1E] opacity-90" />
      
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars}
      </div>
      
      {/* Magical Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6C4AB6] opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-[#9B7EDE] opacity-20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* Profile Header */}
          <motion.div 
            className="mb-8 relative"
            variants={itemVariants}
          >
            {/* Cover Photo */}
            <div className="h-48 w-full rounded-lg bg-gradient-to-r from-[#6C4AB6] to-[#0F0B1E] relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                {/* Pattern overlay */}
                <div className="w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23F2E9E4' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}></div>
              </div>
              <motion.div 
                className="absolute bottom-4 right-4"
                whileHover={{ scale: 1.1 }}
              >
                <button className="bg-[#6C4AB6] hover:bg-[#9B7EDE] transition-colors p-2 rounded-full shadow-lg">
                  <Edit className="w-4 h-4 text-[#F2E9E4]" />
                </button>
              </motion.div>
            </div>
          
            {/* Avatar and Name */}
            <div className="px-6">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="-mt-16 mb-4 md:mb-0">
                  <div className="relative">
                    <motion.div 
                      className="w-32 h-32 rounded-full border-4 border-[#0F0B1E] shadow-lg overflow-hidden bg-[#6C4AB6]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute -bottom-1 -right-1 bg-[#6C4AB6] text-[#F2E9E4] rounded-full px-2 py-1 text-xs font-bold border-2 border-[#0F0B1E]">
                      Lvl 26
                    </div>
                  </div>
                </div>
                
                <div className="md:ml-4 flex-1">
                  <h1 className="text-3xl font-bold text-[#F2E9E4]">{user.name}</h1>
                  <div className="flex items-center text-[#9B7EDE] text-sm">
                    <span>{user.email}</span>
                    <span className="mx-2">•</span>
                    <span>Joined {new Date(user.created).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    <motion.div 
                      className="flex items-center bg-[#6C4AB6] bg-opacity-60 px-2 py-1 rounded-full text-xs"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="mr-1 text-[#D4AF37]">
                        <BookOpen size={16} />
                      </span>
                      Spellbook Owner
                    </motion.div>
                    <motion.div 
                      className="flex items-center bg-[#6C4AB6] bg-opacity-60 px-2 py-1 rounded-full text-xs"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="mr-1 text-[#D4AF37]">
                        <FileText size={16} />
                      </span>
                      Lore Contributor
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <motion.button 
                    className="px-4 py-2 bg-[#6C4AB6] hover:bg-[#9B7EDE] transition-colors rounded-lg shadow-lg text-[#F2E9E4] font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              {/* About Me */}
              <div className="bg-[#1D1135] bg-opacity-70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-[#6C4AB6] mb-6">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <FileText className="mr-2 text-[#D4AF37]" size={18} />
                  About Me
                </h2>
                <p className="text-[#F2E9E4] mb-4">
                  {user.bio || "Avid collector of magical lore, anime enthusiast, and theorist extraordinaire. Always looking for hidden meanings in my favorite series."}
                </p>
                
                <h3 className="text-md font-semibold mb-2 text-[#9B7EDE]">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {["Fantasy", "Supernatural", "Mystery", "Sci-Fi"].map((genre, index) => (
                    <motion.span 
                      key={index}
                      className="px-3 py-1 bg-[#6C4AB6] bg-opacity-50 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {genre}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="bg-[#1D1135] bg-opacity-70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-[#6C4AB6]">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <Award className="mr-2 text-[#D4AF37]" size={18} />
                  Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#6C4AB6] bg-opacity-50 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-[#F2E9E4]">{posts.length}</div>
                    <div className="text-sm text-[#9B7EDE]">Posts</div>
                  </div>
                  <div className="bg-[#6C4AB6] bg-opacity-50 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-[#F2E9E4]">{comments.length}</div>
                    <div className="text-sm text-[#9B7EDE]">Comments</div>
                  </div>
                  <div className="bg-[#6C4AB6] bg-opacity-50 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-[#F2E9E4]">{user.followers || 0}</div>
                    <div className="text-sm text-[#9B7EDE]">Followers</div>
                  </div>
                  <div className="bg-[#6C4AB6] bg-opacity-50 p-3 rounded-lg">
                    <div className="text-3xl font-bold text-[#F2E9E4]">{user.following || 0}</div>
                    <div className="text-sm text-[#9B7EDE]">Following</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Main Content Area */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              {/* Tabs */}
              <div className="bg-[#1D1135] bg-opacity-70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#6C4AB6] mb-6">
                <div className="flex border-b border-[#6C4AB6]">
                  <button 
                    className={`pb-2 px-4 font-medium ${activeTab === 'posts' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F2E9E4] hover:text-[#9B7EDE]'}`}
                    onClick={() => setActiveTab('posts')}
                  >
                    My Posts
                  </button>
                  <button 
                    className={`pb-2 px-4 font-medium ${activeTab === 'comments' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F2E9E4] hover:text-[#9B7EDE]'}`}
                    onClick={() => setActiveTab('comments')}
                  >
                    Comments
                  </button>
                  <button 
                    className={`pb-2 px-4 font-medium ${activeTab === 'bookmarks' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F2E9E4] hover:text-[#9B7EDE]'}`}
                    onClick={() => setActiveTab('bookmarks')}
                  >
                    Bookmarks
                  </button>
                </div>
                
                {/* Tab Content */}
                <div className="py-4">
                  {activeTab === 'posts' && (
                    <div>
                      {posts.length > 0 ? (
                        posts.map(post => (
                          <motion.div 
                            key={post.id}
                            className="mb-4 p-4 bg-[#291C51] bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all border border-[#6C4AB6]"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center mb-2">
                              <span className={`px-2 py-1 text-xs rounded font-medium mr-2 
                                ${getPostType(post) === 'Anime' ? 'bg-[#6C4AB6] bg-opacity-70' : 
                                  getPostType(post) === 'Manga' ? 'bg-[#6C4AB6] bg-opacity-70' : 
                                  'bg-[#6C4AB6] bg-opacity-70'}`}>
                                {getPostType(post)}
                              </span>
                              <h3 className="font-bold text-lg flex-1">{post.title}</h3>
                            </div>
                            <p className="text-[#F2E9E4] mb-3 text-sm">
                              {post.content && post.content.length > 150 
                                ? `${post.content.substring(0, 150)}...` 
                                : post.content}
                            </p>
                            <div className="flex items-center justify-between text-sm text-[#F2E9E4]">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Heart size={14} className="mr-1 text-[#D4AF37]" />
                                  <span>{post.likes || 0}</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle size={14} className="mr-1 text-[#D4AF37]" />
                                  <span>{post.comment_count || 0}</span>
                                </div>
                              </div>
                              <div className="text-xs text-[#9B7EDE]">
                                {new Date(post.created).toLocaleDateString()}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center py-8 text-center">
                          <Book className="text-[#D4AF37] mb-3" size={48} />
                          <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                          <p className="text-[#F2E9E4] mb-4">Share your first lore discovery or theory with the community.</p>
                          <motion.button 
                            className="px-4 py-2 bg-[#6C4AB6] hover:bg-[#9B7EDE] transition-colors rounded-lg shadow-md text-[#F2E9E4] font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Create Post
                          </motion.button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'comments' && (
                    <div>
                      {comments.length > 0 ? (
                        comments.map(comment => (
                          <motion.div 
                            key={comment.id}
                            className="mb-4 p-4 bg-[#291C51] bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all border border-[#6C4AB6]"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-start">
                              <MessageCircle className="text-[#D4AF37] mr-3 mt-1 flex-shrink-0" size={16} />
                              <div className="flex-1">
                                <p className="text-[#F2E9E4]">{comment.content}</p>
                                <div className="flex justify-between items-center mt-2 text-xs text-[#9B7EDE]">
                                  <span>On: {comment.post_title || "Unknown Post"}</span>
                                  <span>{new Date(comment.created).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center py-8 text-center">
                          <MessageCircle className="text-[#D4AF37] mb-3" size={48} />
                          <h3 className="text-lg font-semibold mb-2">No Comments Yet</h3>
                          <p className="text-[#F2E9E4]">Join discussions by commenting on posts that interest you.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'bookmarks' && (
                    <div className="flex flex-col items-center py-8 text-center">
                      <Bookmark className="text-[#D4AF37] mb-3" size={48} />
                      <h3 className="text-lg font-semibold mb-2">No Bookmarks Yet</h3>
                      <p className="text-[#F2E9E4] mb-4">Save your favorite discussions to read later.</p>
                      <motion.button 
                        className="px-4 py-2 bg-[#6C4AB6] hover:bg-[#9B7EDE] transition-colors rounded-lg shadow-md text-[#F2E9E4] font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Content
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MyProfile;