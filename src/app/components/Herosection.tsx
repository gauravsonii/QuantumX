"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const Herosection = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <div className="relative">
      <div className="h-screen w-full bg-black flex items-center justify-center relative">
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center"
          style={{ scale, opacity }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 px-4 sm:px-0 text-white"
            style={{ scale, opacity }}>
            Introducing QuantumX
          </motion.h1>

          <p>
            <i>
            Building a global ecosystem of <b>Web3, Finance & Development innovators</b>.
            </i>
          </p>

          {/* Logo */}
          <motion.img
            src="/assets/quantumx.jpg"
            alt="QuantumX Logo"
            className="mx-auto w-3/4 sm:w-1/2 lg:w-1/4 xl:w-1/5 mt-4"
            style={{ scale, opacity }}
          />
        </motion.div>
      </div>

      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Empowering Innovation</h2>
            <p className="text-lg max-w-2xl mx-auto">
              <i>
              At QuantumX, we believe true progress comes when talent meets opportunity. Our ecosystem is built to empower innovation by uniting skilled minds from Web3, Finance, and Development. Here, ideas don’t stay on paper—they transform into real solutions through collaboration, creativity, and collective strength. We don’t teach, we don’t follow—we build, disrupt, and empower the future together.
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
