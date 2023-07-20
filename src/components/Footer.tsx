import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-customGreen text-white">
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
