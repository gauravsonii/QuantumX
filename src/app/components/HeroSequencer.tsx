"use client";
import { useEffect } from "react";

export default function HeroSequencer() {
  useEffect(() => {
    const hud_delay = 2800;
    let initialCycle = false;
    let safari = false;

    const isSafari = () => {
      const ua = navigator.userAgent;
      return /^((?!chrome|android).)*safari/i.test(ua);
    };

    const layers = document.querySelectorAll('[id^="layer-"]');
    let currentIndex = 0;

    isSafari() && (safari = true);

    function switchLayer() {
      let video = layers[currentIndex].querySelector("video");
      if (!video) return;

      // Hide current layer
      layers[currentIndex].classList.add("invisible");
      video.pause();
      video.currentTime = 0;

      // Move to next layer
      currentIndex = (currentIndex + 1) % layers.length;

      if (currentIndex === 0) {
        currentIndex++;
      }

      video = layers[currentIndex].querySelector("video");
      if (!video) return;

      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video play interrupted:", error);
        });
      }
      layers[currentIndex].classList.remove("invisible");

      // Preload next layer
      const nextLayer = layers[currentIndex + 1]?.querySelector("video");
      if (!nextLayer) {
        initialCycle = true;
        return;
      }
      !safari && nextLayer.load();
      !initialCycle && (nextLayer.preload = "auto");
    }

    layers.forEach((layer, index) => {
      if (index === 0) return;

      const video = layer.querySelector("video");
      video?.addEventListener("ended", switchLayer);
    });

    let scaleTl = setTimeout(() => {
      const firstVideo = layers[0]?.querySelector("video");
      if (firstVideo) {
        const playPromise = firstVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Video play interrupted:", error);
          });
        }
        firstVideo.addEventListener("ended", switchLayer);
      }
      clearTimeout(scaleTl);
    }, 1500);

    const hudVideosWrapper = document.querySelectorAll(".hud-videos");

    hudVideosWrapper.forEach((wrapper) => {
      let hudVideos = wrapper.querySelectorAll("video");

      let hudTl = setTimeout(() => {
        hudVideos.forEach((video) => {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("HUD video play interrupted:", error);
            });
          }
        });
        wrapper.classList.add("loaded");
        clearTimeout(hudTl);
      }, hud_delay);
    });

    // Cleanup
    return () => {
      layers.forEach((layer) => {
        const video = layer.querySelector("video");
        video?.removeEventListener("ended", switchLayer);
      });
    };
  }, []);

  useEffect(() => {
    // Current time update
    const updateTime = () => {
      const now = new Date();
      const timeEl = document.getElementById("current-time");
      const dayEl = document.getElementById("current-day");
      
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
      
      if (dayEl) {
        dayEl.textContent = now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-inner"
      className="relative w-full h-svh flex items-center justify-center"
    >
          <div
            id="hero-sequencer-inner"
            className="absolute z-[1] -bottom-[calc(var(--navbar-height)/2)] lg:bottom-1/2 -translate-y-[calc(var(--navbar-height)/2)] sm:-translate-y-[calc(var(--navbar-height)/2)] lg:translate-y-1/2 mounted:-translate-y-[calc((var(--hero-left-height)-var(--hero-right-height))/2)] sm:mounted:translate-y-[calc((var(--hero-left-height)-var(--navbar-height))/2)] lg:mounted:translate-y-1/2 left-1/2 -translate-x-1/2 w-3/4 lg:w-[50vw] h-svh bg-transparent [transition:opacity_300ms_var(--ease-out-cubic),translate_2000ms_1000ms_var(--ease-in-out-quart)]"
          >
            {/* White background for video content - matches border shape */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 559 741"
              >
                <path
                  fill="#ffffff"
                  d="M 18 0 L 541 0 Q 559 0 559 18 L 559 647 Q 559 661 545 675 L 493 727 Q 479 741 465 741 L 18 741 Q 0 741 0 723 L 0 18 Q 0 0 18 0 Z"
                />
              </svg>
            </div>
            {/* Curved shape border */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 559 741"
              >
                <path
                  strokeWidth="1"
                  stroke="#000000"
                  fill="none"
                  d="M 18 0 L 541 0 Q 559 0 559 18 L 559 647 Q 559 661 545 675 L 493 727 Q 479 741 465 741 L 18 741 Q 0 741 0 723 L 0 18 Q 0 0 18 0 Z"
                />
              </svg>
            </div>
            <div
              id="layer-1"
              className="absolute inset-0 flex items-center justify-center invisible"
            >
              <div className="w-[85%] md:w-[80%] max-h-full absolute z-[1] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 scale-75 mounted:scale-100 transition-transform duration-1000 delay-200 ease-out-quart will-change-transform">
                <div
                  className="opacity-0 mounted:opacity-100 w-full h-auto scale-[0.2] sm:scale-[0.1] mounted:scale-100"
                  style={{
                    transition:
                      "opacity 1000ms 200ms var(--ease-out-quart), scale 2000ms 1000ms var(--ease-in-out-quart)",
                    willChange: "opacity,transform",
                  }}
                >
                  <svg
                    viewBox="0 0 722 628"
                    className="absolute top-1/2 left-1/2 -translate-1/2 w-full scale-78 h-auto object-contain text-black"
                  >
                    <path
                      d="M548.831 381.485C560.015 362.435 587.792 362.435 598.853 381.485L717.703 584.525C728.887 603.575 714.876 627.296 692.63 627.296H454.932C432.686 627.296 418.797 603.575 429.859 584.525L548.831 381.485Z"
                      fill="currentcolor"
                    ></path>
                    <path
                      d="M477.034 246.295C487.849 227.367 487.849 204.015 477.034 184.965L379.57 14.9872C368.631 -4.06311 341.346 -4.06311 330.408 14.9872L4.21765 584.407C-6.7209 603.457 6.92156 627.301 28.7987 627.301H223.603C245.358 627.301 265.391 615.625 276.207 596.697L476.911 246.295H477.034Z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                  <video
                    playsInline
                    preload="auto"
                    muted
                    className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-auto object-contain"
                  >
                    <source
                      src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/alpha_mp4/reveal.mp4"
                      type='video/mp4;codecs=hvc1'
                    />
                    <source
                      src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/alpha_webm/reveal.webm"
                      type="video/webm;"
                    />
                  </video>
                </div>
              </div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                id={`layer-${num + 1}`}
                className={`absolute inset-0 flex items-center justify-center ${num === 3 ? "" : "invisible"}`}
              >
                <div className="w-[85%] md:w-[80%] absolute z-[1] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <video
                    preload="auto"
                    playsInline
                    muted
                    className="w-full h-full object-contain"
                  >
                    <source
                      src={`https://atk2comacjoao5mp.public.blob.vercel-storage.com/alpha_mp4/${num}.mp4`}
                      type="video/mp4;codecs=hvc1"
                    />
                    <source
                      src={`https://atk2comacjoao5mp.public.blob.vercel-storage.com/alpha_webm/${num}.webm`}
                      type="video/webm"
                    />
                  </video>
                </div>
              </div>
            ))}
          </div>

          <div className="hud-videos absolute w-full lg:w-[50vw] left-1/2 -translate-x-1/2 bottom-(--hero-left-height) sm:bottom-0 top-[calc(var(--hero-right-height)+var(--navbar-height))] lg:top-(--navbar-height) opacity-0 mounted:opacity-100 duration-1000 delay-2000 ease-out-cubic loaded">
            <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-300 dark:duration-150 ease-in-cubic dark:ease-out-cubic delay-150 dark:delay-0">
              <video
                src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/hud.mp4"
                playsInline
                preload="auto"
                loop
                muted
                className="absolute right-(--padding-base) sm:right-(--padding-md) top-(--padding-md) w-[40%] h-auto object-contain -scale-100"
              ></video>
              <video
                src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/hud.mp4"
                preload="auto"
                playsInline
                loop
                muted
                className="absolute left-(--padding-base) bottom-(--padding-md) w-1/3 h-auto object-contain -scale-100"
              ></video>
            </div>
          </div>

          <div className="hud-videos dark absolute w-full lg:w-[50vw] left-1/2 -translate-x-1/2 bottom-(--hero-left-height) sm:bottom-0 top-[calc(var(--hero-right-height)+var(--navbar-height))] lg:top-(--navbar-height) mix-blend-screen opacity-0 mounted:opacity-100 duration-1000 delay-2000 ease-out-cubic loaded">
            <div className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity dark:duration-300 duration-150 dark:ease-in-cubic ease-out-cubic dark:delay-150 delay-0">
              <video
                src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/hud_dark.mp4"
                preload="auto"
                playsInline
                loop
                muted
                className="absolute right-(--padding-base) sm:right-(--padding-md) top-(--padding-md) w-[40%] h-auto object-contain -scale-100"
              ></video>
              <video
                src="https://atk2comacjoao5mp.public.blob.vercel-storage.com/hud_dark.mp4"
                playsInline
                preload="auto"
                loop
                muted
                className="absolute left-(--padding-base) bottom-(--padding-md) w-1/3 h-auto object-contain -scale-100"
              ></video>
            </div>
          </div>
    </div>
  );
}
