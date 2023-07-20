import React from "react";
import { SocialIcon } from "react-social-icons";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white">
      <SocialIcon
        className="ml-4"
        url="https://twitter.com/ursisterbtw"
        target="_blank"
        bgColor="#ffffff"
        style={{ height: 25, width: 25 }}
      />
      <h1>ursister's dashboard</h1>

      <SocialIcon
        className="mr-4"
        url="https://github.com/ursisterbtw"
        target="_blank"
        bgColor="#ffffff"
        style={{ height: 25, width: 25 }}
      />
    </header>
  );
};

export default Header;
