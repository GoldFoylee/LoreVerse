import React, { useState, useEffect } from 'react';
import pb from '../lib/pb';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
  'https://www.pixelstalk.net/wp-content/uploads/images6/Solo-Leveling-HD-Wallpaper-Free-download.png',
  'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/04/img_0354.jpeg',
  'https://www.gry-online.pl/i/h/25/435939657.jpg',
  'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/06/ryomen-sukuna.jpg',
  'https://i.ytimg.com/vi/GSasE2bPbI8/maxresdefault.jpg',
];

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await pb.collection('users').authWithPassword(form.email, form.password);
      alert('Login successful!');
      navigate('/feed');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your email or password.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-start px-6 text-white relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={backgroundImages[currentImage]}
            src={backgroundImages[currentImage]}
            alt="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gradient-to-br from-[#1e1b3a]/90 to-[#2d1e4f]/90 border border-[#A78BFA] backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-md w-full ml-0 md:ml-12"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-[#C4B5FD] mb-6 tracking-widest"
        >
          Welcome Back, Adventurer
        </motion.h2>

        <form onSubmit={handleLogin} className="space-y-5 text-white">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className="block text-sm mb-1 text-[#D8B4FE]">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="you@loreverse.com"
              className="w-full px-4 py-2 rounded bg-[#1A1A1A] border border-[#A78BFA] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="block text-sm mb-1 text-[#D8B4FE]">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="********"
              className="w-full px-4 py-2 rounded bg-[#1A1A1A] border border-[#A78BFA] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            />
          </motion.div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-red-400 text-sm">
              {error}
            </motion.p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full mt-2 bg-[#A78BFA] text-black hover:bg-[#C4B5FD] font-bold py-2 rounded-lg transition-all"
          >
            Enter LoreVerse 🌌
          </motion.button>
          <p className="text-center text-sm mt-4 text-[#C4B5FD]">
            Don’t have an account?{' '}
            <Link to="/signup" className="underline hover:text-white">
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
