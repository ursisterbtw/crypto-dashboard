import React, { useState } from "react";

const Module1: React.FC = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );
    const data = await response.json();

    // Convert Wei to Ether and round to 2 decimal places
    const balanceInEther = (parseInt(data.result) / 10 ** 18).toFixed(2);

    setBalance(balanceInEther);
  };
  return (
    <div className="p-4 bg-gray-300 shadow-md rounded-md">
      <h2 className="text-l font-bold">balance checkoor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="text-center w-full m-2 p-2 rounded-md"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="eth addy"
          required
        />
        <button type="submit" className="btn">
          Check Balance
        </button>
      </form>
      {balance && <p>Balance: {balance} Ether</p>}
    </div>
  );
};

export default Module1;
