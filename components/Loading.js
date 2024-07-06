"use client";

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white text-2xl">
        Loading
        <span className="animate-blink">.</span>
        <span className="animate-blink animation-delay-200">.</span>
        <span className="animate-blink animation-delay-400">.</span>
      </p>
    </div>
  );
};

export default Loading;
