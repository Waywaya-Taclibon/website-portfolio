import { useEffect, useRef, useState } from "react";

const MAX_STARS = 240;
const RESIZE_DEBOUNCE_MS = 200;

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const resizeTimer = useRef(null);

  // 1) read initial theme and listen for theme-change events
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    } else if (storedTheme === "light") {
      setIsDarkMode(false);
    } else {
      // default when nothing is stored
      setIsDarkMode(true); // <- dark mode default
      localStorage.setItem("theme", "dark"); // optional: store default
    }

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

      // Debounced — regenerating ~200 stars per resize pixel janks the page
      handleResize = () => {
        if (resizeTimer.current) clearTimeout(resizeTimer.current);
        resizeTimer.current = setTimeout(generateStars, RESIZE_DEBOUNCE_MS);
      };
      window.addEventListener("resize", handleResize);
    } else {
      generateClouds();
      setStars([]); // clean leftover stars
      setMeteors([]); // clean leftover meteors
    }

    return () => {
      if (handleResize) window.removeEventListener("resize", handleResize);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, [isDarkMode]);

  const generateStars = () => {
    const numberOfStars = Math.min(
      MAX_STARS,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      // Two depth layers: small dim stars + fewer large bright ones
      const isBright = Math.random() > 0.75;
      const animationDuration = Math.random() * 4 + 2;
      newStars.push({
        id: `s-${i}-${Math.random().toString(36).slice(2, 7)}`, // unique id
        size: isBright ? Math.random() * 1.5 + 2 : Math.random() * 1.5 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: isBright
          ? Math.random() * 0.2 + 0.8
          : Math.random() * 0.3 + 0.4,
        animationDuration,
        // Negative delay desyncs the twinkle so the field shimmers
        animationDelay: -(Math.random() * animationDuration),
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      const animationDuration = Math.random() * 3 + 3;
      newMeteors.push({
        id: `m-${i}-${Math.random().toString(36).slice(2, 7)}`,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        opacity: Math.random() * 0.4 + 0.6, // floor so none are invisible
        animationDuration,
        // Staggered starts instead of all four firing at once
        animationDelay: -(Math.random() * animationDuration),
      });
    }
    setMeteors(newMeteors);
  };

  const generateClouds = () => {
    const numberOfClouds = 25;
    const newClouds = [];
    for (let i = 0; i < numberOfClouds; i++) {
      const speed = Math.random() * 55 + 55;
      newClouds.push({
        id: `c-${i}-${Math.random().toString(36).slice(2, 7)}`,
        size: Math.random() * 80 + 50,
        x: Math.random() * 100,
        y: Math.random() * 40,
        speed,
        // Negative delay computed once here (was Math.random() in render)
        animationDelay: -(Math.random() * speed),
      });
    }
    setClouds(newClouds);
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        backgroundColor: isDarkMode ? "black" : "#ffffff", // background here
      }}
    >
      {/* Subtle theme-aware nebula depth — same family as the hero orbs */}
      {isDarkMode ? (
        <>
          <div className="absolute left-[-10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute right-[-15%] bottom-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-indigo-600/10 blur-3xl" />
        </>
      ) : (
        <>
          <div className="absolute left-[-10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute right-[-15%] bottom-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-violet-300/20 blur-3xl" />
        </>
      )}

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
                animationDelay: star.animationDelay + "s",
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
                animationDelay: meteor.animationDelay + "s",
              }}
            />
          ))}
        </>
      ) : (
        <>
          {clouds.map((cloud) => (
            <div
              key={cloud.id}
              className="cloud"
              style={{
                top: cloud.y + "%",
                marginLeft: cloud.x + "%", // static offset; motion runs on transform
                ["--cloud-scale"]: cloud.size / 50,
                animationDuration: `${cloud.speed}s`,
                animationDelay: `${cloud.animationDelay}s`,
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
