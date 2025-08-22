"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between px-4 py-4 text-lg text-white bg-black border-2 border-white shadow-xl border-solid sm:rounded-full md:px-6 md:m-4 md:mx-14 max-sm:rounded-3xl shadow-teal-900">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image
          src="/assets/quantumx.jpg"
          alt="QuantumX"
          width={48}
          height={48}
          className="object-contain w-12"
        />
        <span className="ml-2 text-xl font-bold">QuantumX</span>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="text-white">
          <FontAwesomeIcon icon={isMenuVisible ? faTimes : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Menu */}
      <div className={`w-full sm:flex sm:items-center sm:w-auto ${isMenuVisible ? "block" : "hidden"}`}>
        <ul className="pt-4 text-base sm:flex sm:justify-between sm:pt-0">
          <li className="sm:mx-4">
            <a href="#home" className="text-white hover:text-cyan-300">
              HOME
            </a>
          </li>
          <li className="sm:mx-4">
            <a href="#about" className="text-white hover:text-cyan-300">
              ABOUT
            </a>
          </li>
          <li className="sm:mx-4">
            <a href="#domains" className="text-white hover:text-cyan-300">
              DOMAINS
            </a>
          </li>
          <li className="sm:ml-4 mr-2">
            <a href="#contact" className="text-white hover:text-cyan-300">
              CONTACT
            </a>
          </li>
          <div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="w-5 h-5" />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
