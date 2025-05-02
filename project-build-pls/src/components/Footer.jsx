import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black text-yellow-100 border-t border-yellow-500 py-10 px-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Title & Tagline */}
        <div className="text-center md:text-left">
          <p className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-1">
            LoreVerse
          </p>
          <p className="text-sm text-yellow-300 tracking-wide">
            Explore theories, share your voice, and discover more.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://github.com/VanshDagar27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/yourtwitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/vansh-dagar-05861b339/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Buttons & Links */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={scrollToTop}
            className="text-sm border border-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 hover:text-black transition-all"
          >
            Scroll to Top
          </button>

        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-yellow-400 mt-6">
        &copy; {new Date().getFullYear()} LoreVerse. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;