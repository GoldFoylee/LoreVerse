import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../lib/pb';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = pb.authStore.isValid;
  const user = pb.authStore.model;

  const phrases = ['LoreVerse', 'Decode the Lore. Discover the Universe.'];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setIsDeleting(true);
        setSpeed(60);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        setSpeed(100);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  const handleLogout = () => {
    pb.authStore.clear();
    navigate('/');
  };

  return (
    <header className="bg-black border-b border-yellow-500 shadow-lg sticky top-0 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-yellow-50">
        {/* Animated Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text drop-shadow-md min-w-[260px]">
          {text}
          <span className="text-yellow-400 animate-pulse">|</span>
        </h1>

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center text-sm md:text-base font-medium">
          <Link to="/feed" className="text-yellow-100 hover:text-yellow-400 tracking-wide transition duration-200">Feed</Link>

          {isLoggedIn && (
            <>
              <Link to="/chatbot" className="text-yellow-100 hover:text-yellow-400 tracking-wide transition duration-200">AI Chatbot</Link>
              <Link to="/profile" className="text-yellow-100 hover:text-yellow-400 tracking-wide transition duration-200">My Profile</Link>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup" className="text-yellow-100 hover:text-yellow-400 tracking-wide transition duration-200">Sign Up</Link>
              <Link to="/" className="text-yellow-100 hover:text-yellow-400 tracking-wide transition duration-200">Log In</Link>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded shadow-md text-xs md:text-sm transition font-semibold"
            >
              Logout ({user?.name})
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;