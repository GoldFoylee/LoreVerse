import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Info, Flame, TrendingUp } from 'lucide-react';

const moviesData = [
  {
    id: 1,
    title: "Attack On Titan",
    image: 'https://m.media-amazon.com/images/M/MV5BNzVjOWEwYjEtNDJhOC00YjUyLThjMWItMDQwZGY1ODM4YzI3XkEyXkFqcGc@._V1_.jpg',
    rating: 4.8,
    year: 2019
  },
  {
    id: 2,
    title: "Death Note",
    image: 'https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: 4.5,
    year: 2022
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: 'https://m.media-amazon.com/images/M/MV5BNmI1MmYxNWQtY2E5NC00ZTlmLWIzZGEtNzM1YmE3NDA5NzhjXkEyXkFqcGc@._V1_.jpg',
    rating: 4.2,
    year: 2023
  },
  {
    id: 4,
    title: "The Exorcist",
    image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p6107_p_v10_az.jpg',
    rating: 4.7,
    year: 1994
  },
  {
    id: 5, 
    title: "The Haunting Of Hill House",
    image: 'https://m.media-amazon.com/images/M/MV5BMTU4NzA4MDEwNF5BMl5BanBnXkFtZTgwMTQxODYzNjM@._V1_FMjpg_UX1000_.jpg',
    rating: 4.0,
    year: 2018
  },
  {
    id: 6,
    title: "Shawshank Redemption",
    image: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: 4.6,
    year: 2023
  },
  {
    id: 7,
    title: "Breaking Bad",
    image: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/breaking_bad_4.png',
    rating: 4.9,
    year: 2008
  },
  {
    id: 8,
    title: "Game Of Thrones",
    image: 'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: 4.4,
    year: 2019
  },
  {
    id: 9,
    title: "Interstellar",
    image: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: 4.1,
    year: 1999
  },
  {
    id: 10,
    title: "Silicon Valley",
    image: 'https://m.media-amazon.com/images/M/MV5BMjhhYmZjZjgtOTc3Mi00ZmY3LWI3MTUtYzcyOGMxYWFmN2YyXkEyXkFqcGc@._V1_.jpg',
    rating: 4.7,
    year: 2022
  },
];

function PopularScroller() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="relative bg-black py-16 overflow-hidden">
      {/* Yellow accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      {/* Heading */}
      <div className="container mx-auto mb-8 px-6">
        <div className="flex items-center space-x-2">
          <Flame className="h-7 w-7 text-yellow-500" />
          <h2 className="text-3xl font-bold text-white">Popular</h2>
        </div>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>

      {/* Scrolling cards */}
      <div className="relative scroll-wrapper z-10">
        <motion.div 
          className="flex py-6 gap-6 px-10"
          animate={{ x: [0, -3500] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 80, ease: "linear" } }}
        >
          {[...moviesData, ...moviesData].map((movie, i) => (
            <div 
              key={`${movie.id}-${i}`} 
              className="relative flex-shrink-0"
              onMouseEnter={() => setHoveredId(`${movie.id}-${i}`)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative w-56 h-80 rounded-lg overflow-hidden shadow-2xl"
                initial={{ boxShadow: "0 0 0 transparent" }}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Poster */}
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" fill="black" />
                  {movie.rating}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500"></div>

                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === `${movie.id}-${i}` ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-500 font-medium text-sm">#1 Popular</span>
                    </div>
                    <span className="text-gray-300 text-sm">{movie.year}</span>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3">{movie.title}</h3>

                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 rounded-lg transition-colors">
                      <Play className="w-4 h-4 mr-1" fill="black" />
                      <span>Watch</span>
                    </button>
                    <button className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-3 rounded-lg transition-colors border border-yellow-500/30">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side fade overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20"></div>

      {/* Bottom yellow accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
    </div>
  );
}

export default PopularScroller;
