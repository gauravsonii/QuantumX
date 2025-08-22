"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";

export default function Joincodenex() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleJoinWaitlist = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return; // Prevent empty submission

    const mailtoLink = `mailto:connect.codenex@gmail.com?subject=Join%20CodeNex%20Waitlist&body=Hello,%0A%0AI would like to join CodeNex. Here is my email: ${email}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-5 pt-20">
      <main className="w-full max-w-5xl bg-[#ffcf52] mb-10 lg:mt-24 rounded-[50px] shadow-lg p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="max-w-lg w-full text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join QuantumX Ecosystem
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Stay connected with QuantumX! For inquiries, collaborations, or
            joining our community, reach out to us at{" "}
            <a
              href="mailto:connect.quantumx@gmail.com"
              className="text-blue-600 underline"
            >
              connect.quantumx@gmail.com
            </a>
            
            . We&apos;re here to innovate together!
          </p>
          <form
            onSubmit={handleJoinWaitlist}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your E-mail"
              value={email}
              onChange={handleEmailChange}
              required
              aria-label="Email input"
              className="flex-1 p-3 border border-gray-300 rounded-full text-black text-lg"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full text-lg transition hover:bg-gray-800"
            >
              Connect with us
            </button>
          </form>
        </div>
        <div className="w-60 h-60 md:w-96 md:h-96 flex justify-center items-center">
          <Image
            src="/assets/whitequantum.png"
            alt="QuantumX Logo"
            width={382}
            height={383}
            priority
          />
        </div>
      </main>
    </div>
  );
}
