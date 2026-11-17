import React from "react";

function Navbar() {
  return (
    <nav className="w-full h-[100px] bg-gradient-to-r from-[#3212A9] to-[#5932D6] flex items-center px-9 text-white">

      {/* Logo and Brand */}
      <div className="flex items-center gap-5">

        {/* Logo */}
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
          <span className="text-4xl font-bold text-purple-700">
            T
          </span>
        </div>

        {/* Project Name */}
        <h1 className="text-4xl font-bold">
          Transo
        </h1>

      </div>

      {/* Vertical Separator */}
      <div className="h-10 w-[2px] bg-white/70 mx-8"></div>

      {/* Tagline */}
      <p className="text-2xl font-medium">
        Text Tools & Translator
      </p>

    </nav>
  );
}

export default Navbar;