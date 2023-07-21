import React, { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const Module4: React.FC<{ className?: string }> = ({ className }) => {
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data: Coin[] = await res.json();

      const sortedCoins = [...data].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );

      setGainers(sortedCoins.slice(0, 5));
      setLosers(sortedCoins.slice(-5).reverse());
    };

    fetchCoins();
  }, []);

  return (
    <div className={`p-4 bg-gray-400 shadow-md rounded-md ${className}`}>
      {" "}
      <h2 className="text-lg">Top Gainers & Losers</h2>
      <div className="mt-2">
        <h3 className="text-green-600">Top Gainers</h3>
        {gainers.map((coin) => (
          <p key={coin.id}>
            {coin.name}: {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ))}
      </div>
      <div className="mt-2">
        <h3 className="text-red-600">Top Losers</h3>
        {losers.map((coin) => (
          <p key={coin.id}>
            {coin.name}: {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default Module4;
