import React, { useState } from "react";
import { ethers } from "ethers";
import AnimatedButton from "@/utils/AnimatedButton";

const Module1: React.FC = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [usdBalance, setUsdBalance] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );
    const data = await response.json();

    // convert wei to ether and round to 2 decimal places
    const balanceInEther = (parseInt(data.result) / 10 ** 18).toFixed(2);
    setBalance(balanceInEther);

    // fetch ETH price in USD
    const priceResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const priceData = await priceResponse.json();

    const balanceInUsd = (
      parseFloat(balanceInEther) * priceData.ethereum.usd
    ).toFixed(2);
    setUsdBalance(balanceInUsd);
  };

  return (
    <div className="p-4 bg-gray-400 shadow-md rounded-md">
      <h2 className="text-lg">balance checkoor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="text-center w-full m-2 p-2 rounded-md"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="eth addy"
          required
        />
        <AnimatedButton type="submit" className="btn">
          Check Balance
        </AnimatedButton>
      </form>
      {balance && (
        <p>
          Balance: <br />
          {balance} Ether <br />${usdBalance}
        </p>
      )}
    </div>
  );
};

export default Module1;
