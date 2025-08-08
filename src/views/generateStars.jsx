import React, { useEffect, useState } from "react";
import './generateStars.css'
const NUM_STARS = 300;
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      id: i,
      top: Math.random() * 100, // height range (px)
      left: Math.random() * 100, // percent of container width
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    });
  }
  return stars;
};

const Stars = () => {
  const [stars] = useState(generateStars());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move stars container upward at 2x scroll speed
const maxTranslateY = -888; 
const translateY = Math.max(-scrollY * 1.5, maxTranslateY);

  return (
    <div
      className="stars-container"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      {stars.map(({ id, top, left, size, opacity }) => (
        <div
          key={id}
          className="star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
