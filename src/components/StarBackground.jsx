import React, { useEffect, useState } from "react";

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1) read initial theme and listen for theme-change events
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");

    const onThemeChange = (e) => {
      setIsDarkMode(Boolean(e?.detail?.isDarkMode));
    };

    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  // 2) generate visuals whenever isDarkMode changes
  useEffect(() => {
    let handleResize = null;

    if (isDarkMode) {
      generateStars();
      generateMeteors();
      setClouds([]); // remove clouds when dark

      handleResize = () => generateStars();
      window.addEventListener("resize", handleResize);
    } else {
      generateClouds();
      setStars([]); // clean leftover stars
      setMeteors([]); // clean leftover meteors
    }

    return () => {
      if (handleResize) window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: `s-${i}-${Math.random().toString(36).slice(2, 7)}`, // unique id
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: `m-${i}-${Math.random().toString(36).slice(2, 7)}`,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        opacity: Math.random() * 1, // keep opacity sensible
        animationDuration: Math.random() * 3 + 3,
      });
    }
    setMeteors(newMeteors);
  };

  const generateClouds = () => {
    const numberOfClouds = 25;
    const newClouds = [];
    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: `c-${i}-${Math.random().toString(36).slice(2, 7)}`,
        size: Math.random() * 80 + 50,
        x: Math.random() * 100,
        y: Math.random() * 40,
        speed: Math.random() * 20 + 20,
      });
    }
    setClouds(newClouds);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        backgroundColor: isDarkMode ? "black" : "#ffffff", // background here
      }}
    >
      {isDarkMode ? (
        <>
          {stars.map((star) => (
            <div
              key={star.id}
              className="star animate-pulse-subtle"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
              }}
            />
          ))}
          {meteors.map((meteor) => (
            <div
              key={meteor.id}
              className="meteor animate-meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size * 2 + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDuration: meteor.animationDuration + "s",
              }}
            />
          ))}
        </>
      ) : (
        <>
          {clouds.map((cloud, index) => (
            <div
              key={cloud.id}
              className="cloud normal"
              style={{
                top: cloud.y + "%",
                left: cloud.x + "%", // start anywhere in the viewport
                transform: `scale(${cloud.size / 50})`,
                animationDuration: `${cloud.speed}s`,
                animationDelay: `-${Math.random() * cloud.speed}s`, // negative delay = mid-animation
              }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StarBackground;
