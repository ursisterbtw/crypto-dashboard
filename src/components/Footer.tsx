import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-black text-white">
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
