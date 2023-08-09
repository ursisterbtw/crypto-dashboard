import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AnimatedButton from "@/utils/AnimatedButton";

const Module1: React.FC = () => {
  const [input, setInput] = useState("");
  const [addresses, setAddresses] = useState<
    { address: string; balance: string; usdBalance: string; id: number }[]
  >([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedAddresses = localStorage.getItem("addresses");
        const storedNextId = localStorage.getItem("nextId");
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }
        if (storedNextId) {
          setNextId(Number(storedNextId));
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching data from localStorage.",
        error
      );
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("addresses", JSON.stringify(addresses));
        localStorage.setItem("nextId", nextId.toString());
      }
    } catch (error) {
      console.error(
        "An error occurred while saving data to localStorage.",
        error
      );
    }
  }, [addresses, nextId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let resolvedAddress = input;

    try {
      if (input.endsWith(".eth")) {
        const provider = new ethers.AlchemyProvider(
          "homestead",
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        );
        resolvedAddress = await provider.resolveName(input);
        if (!resolvedAddress) {
          alert("Could not resolve ENS name.");
          return;
        }
      }

      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${resolvedAddress}&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      );
      if (!response.ok)
        throw new Error("Error fetching balance from etherscan");
      const data = await response.json();

      const balanceInEther = (parseInt(data.result) / 10 ** 18).toFixed(2);

      const priceResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      if (!priceResponse.ok)
        throw new Error("Error fetching price from coingecko");
      const priceData = await priceResponse.json();

      const balanceInUsd = (
        parseFloat(balanceInEther) * priceData.ethereum.usd
      ).toFixed(2);

      setAddresses((prevAddresses) => [
        ...prevAddresses,
        {
          address: resolvedAddress,
          balance: balanceInEther,
          usdBalance: balanceInUsd,
          id: nextId,
        },
      ]);
      setNextId((prevId) => prevId + 1);
      setInput("");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const formatAddress = (address: string) => {
    return address.slice(0, 4) + "{...}" + address.slice(-4);
  };

  return (
    <div className="p-4 bg-gray-400 bg-opacity-50 shadow-md rounded-md">
      <h2 className="text-lg">Balance Checker</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="text-center w-full m-2 p-2 rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eth addy"
          required
        />
        <AnimatedButton type="submit" className="btn">
          Add Address
        </AnimatedButton>
      </form>
      {addresses.map(({ address, balance, usdBalance, id }) => (
        <div key={id} className="flex justify-between items-center my-2">
          <p className="mr-2">
            {formatAddress(address)} <br />
            {balance} ETH : ${usdBalance}
          </p>
          <AnimatedButton
            onClick={() => handleDelete(id)}
            className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
          >
            X
          </AnimatedButton>
        </div>
      ))}
    </div>
  );
};

export default Module1;
