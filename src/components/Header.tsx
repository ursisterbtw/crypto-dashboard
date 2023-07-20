import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white">
      <a target="_blank" href="https://twitter.com/ursisterbtw">
        <img
          src="/twitter-icon.png"
          alt="Twitter"
          style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
        />
      </a>
      <h1>ursister's dashboard</h1>
      <a target="_blank" href="https://github.com/ursisterbtw">
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
