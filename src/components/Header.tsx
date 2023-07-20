import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white">
      <a href="https://twitter.com/yourusername">
        <img
          src="/twitter-icon.png"
          alt="Twitter"
          style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
        />
      </a>
      <h1>ursister's dashboard</h1>
      <a href="https://github.com/yourusername">
        <img
          src="/github-icon.png"
          alt="GitHub"
          style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
        />
      </a>
    </header>
  );
};

export default Header;
