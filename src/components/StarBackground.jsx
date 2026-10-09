import { useEffect, useRef, useState } from "react";

const MAX_STARS = 240;
const RESIZE_DEBOUNCE_MS = 200;

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const resizeTimer = useRef(null);
  const nebulaRef = useRef(null);
  const contentRef = useRef(null);

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

  // 3) subtle mouse parallax — nebula drifts most, starfield least.
  // Skipped for touch pointers and reduced-motion users.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMouseMove = (e) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      if (nebulaRef.current) {
        nebulaRef.current.style.transform = `translate3d(${(current.x * 24).toFixed(2)}px, ${(current.y * 24).toFixed(2)}px, 0)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${(current.x * 10).toFixed(2)}px, ${(current.y * 10).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const generateStars = () => {
    const count = Math.min(
      MAX_STARS,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );
    // Jittered grid: one star per cell for even coverage, no clumps.
    // Every 4th star is bright instead of a dice roll.
    const aspect = window.innerWidth / Math.max(1, window.innerHeight);
    const cols = Math.max(1, Math.ceil(Math.sqrt(count * aspect)));
    const rows = Math.max(1, Math.ceil(count / cols));
    const cellW = 100 / cols;
    const cellH = 100 / rows;
    const newStars = [];
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const isBright = i % 4 === 3;
      const animationDuration = Math.random() * 4 + 2;
      newStars.push({
        id: `s-${i}-${Math.random().toString(36).slice(2, 7)}`, // unique id
        size: isBright ? Math.random() * 1.5 + 2 : Math.random() * 1.5 + 1,
        x: (col + 0.15 + Math.random() * 0.7) * cellW,
        y: (row + 0.15 + Math.random() * 0.7) * cellH,
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
    // Fewer, slower streaks — occasional accents, not constant traffic
    const numberOfMeteors = 3;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      const animationDuration = Math.random() * 4 + 5;
      newMeteors.push({
        id: `m-${i}-${Math.random().toString(36).slice(2, 7)}`,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        opacity: Math.random() * 0.4 + 0.6, // floor so none are invisible
        animationDuration,
        // Staggered starts instead of all firing at once
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

  const theme = isDarkMode ? "dark" : "light";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-700"
      style={{
        backgroundColor: isDarkMode ? "black" : "#ffffff", // background here
      }}
    >
      {/* Subtle theme-aware nebula depth — same family as the hero orbs */}
      <div ref={nebulaRef} className="absolute inset-0">
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
      </div>

      {/* Keyed wrapper replays a fade-in on theme change over the
          transitioning background — no black/white flash. */}
      <div key={theme} ref={contentRef} className="absolute inset-0 animate-bg-fade-in">
        {isDarkMode ? (
          <>
            {stars.map((star) => (
              // Wrapper holds position + static brightness; the inner dot
              // runs the pulse (whose opacity keyframes would otherwise
              // override the per-star variance).
              <div
                key={star.id}
                className="absolute"
                style={{
                  left: star.x + "%",
                  top: star.y + "%",
                  opacity: star.opacity,
                }}
              >
                <div
                  className="star animate-pulse-subtle"
                  style={{
                    width: star.size + "px",
                    height: star.size + "px",
                    animationDuration: star.animationDuration + "s",
                    animationDelay: star.animationDelay + "s",
                  }}
                />
              </div>
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
    </div>
  );
};

export default StarBackground;
