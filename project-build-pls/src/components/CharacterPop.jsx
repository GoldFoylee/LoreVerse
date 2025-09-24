import React, { useEffect, useState } from "react";

const characters = [
  "https://pngfre.com/wp-content/uploads/satoru-gojo-25-662x1024.png",
  "https://static.wikia.nocookie.net/1e39c2a9-f2b3-4673-927f-9ed5d5c3f188/scale-to-width/755",
  "https://www.pngplay.com/wp-content/uploads/6/Walter-White-Breaking-Bad-Background-PNG-Image.png",
  "https://www.pngplay.com/wp-content/uploads/9/Jon-Snow-Transparent-Image.png",
  "https://www.pngplay.com/wp-content/uploads/12/Light-Yagami-Background-PNG.png",
  "https://www.pngmart.com/files/19/Captain-Levi-Ackerman-Transparent-PNG.png",
  "https://www.pngplay.com/wp-content/uploads/7/Harry-Potter-PNG-HD-Quality.png",
];

function getRandomPosition() {
  return {
    top: `${Math.random() * 80 + 5}%`,
    left: `${Math.random() * 80 + 5}%`,
  };
}

function CharacterPopEffect() {
  const [pops, setPops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const position = getRandomPosition();
      const character =
        characters[Math.floor(Math.random() * characters.length)];

      setPops((prev) => [...prev, { id, character, position }]);

      setTimeout(() => {
        setPops((prev) => prev.filter((p) => p.id !== id));
      }, 3000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
      {pops.map((pop) => (
        <img
          key={pop.id}
          src={pop.character}
          alt="character"
          className="absolute w-24 h-24 object-contain opacity-0 animate-fadeZoom"
          style={{ top: pop.position.top, left: pop.position.left }}
        />
      ))}
    </div>
  );
}

export default CharacterPopEffect;
