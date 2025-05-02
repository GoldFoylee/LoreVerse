import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../lib/pb';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import Footer from './Footer';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    const data = {
      email: form.email,
      emailVisibility: true,
      name: form.name,
      password: form.password,
      passwordConfirm: form.confirmPassword,
    };

    try {
      const record = await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(form.email);
      alert('Account created! Check your email for verification.');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Email may already be in use.');
    }
  };

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.3] blur-sm"
        >
          <source src="/video/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Sign Up Box */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-8 shadow-xl text-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-yellow-400">Sign Up to LoreVerse</h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full p-3 bg-zinc-900 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 bg-zinc-900 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full p-3 bg-zinc-900 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full p-3 bg-zinc-900 border border-yellow-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-300"
            />

            {error && <p className="text-yellow-400 text-sm">{error}</p>}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg mt-4 hover:bg-yellow-600 transition"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <Footer />
    </>
  );
}

export default Signup;
