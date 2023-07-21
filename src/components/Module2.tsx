import React, { useState, useEffect } from "react";
import AnimatedButton from "@/utils/AnimatedButton";

type Coin = {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type CoinList = {
  id: string;
  symbol: string;
};

const Module2: React.FC = () => {
  const [input, setInput] = useState("");
  const [coinData, setCoinData] = useState<Coin | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const coinListRes = await fetch(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const coinList: CoinList[] = await coinListRes.json();

    // Find the coin that the user inputs by ID or symbol
    const coin = coinList.find((c) => c.id === input || c.symbol === input);

    if (coin) {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      const data = await res.json();

      setCoinData({
        id: data.id,
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h:
          data.market_data.price_change_percentage_24h_in_currency.usd,
      });

      setInput("");
    } else {
      alert("Could not find coin.");
    }
  };

  return (
    <div className="p-4 bg-gray-400 shadow-md rounded-md">
      <h2 className="text-l">price trackoor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="text-center w-full m-2 p-2 rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter coin"
          required
        />
        <AnimatedButton type="submit" className="btn">
          Add Coin
        </AnimatedButton>
      </form>
      {coinData && (
        <div className="mb-1">
          <span className="">{coinData.id.toUpperCase()}:</span>{" "}
          <span
            className={
              coinData.price_change_percentage_24h > 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            ${coinData.current_price.toFixed(2)}
          </span>{" "}
          <span
            className={
              coinData.price_change_percentage_24h > 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            ({coinData.price_change_percentage_24h > 0 ? "+" : ""}
            {coinData.price_change_percentage_24h.toFixed(2)}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default Module2;
