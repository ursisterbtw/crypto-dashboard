import React, { useState, useEffect } from "react";

type Coin = {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const Module2: React.FC = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (coins.length < 3) {
      setCoins((prevCoins) => [...prevCoins, input]);
      setInput("");
    } else {
      alert("You can only track 3 coins at a time.");
    }
  };

  const deleteCoin = (coin: string) => {
    setCoins((prevCoins) => prevCoins.filter((c) => c !== coin));
  };

  const [coinData, setCoinData] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const data: Coin[] = await Promise.all(
        coins.map(async (coin) => {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
          );
          const [data] = await res.json();
          return data;
        })
      );
      setCoinData(data);
    };

    if (coins.length > 0) {
      fetchCoins();
    }
  }, [coins]);

  return (
    <div className="p-4 bg-gray-300 shadow-md rounded-md">
      <h2 className="text-l font-bold">price trackoor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="text-center w-full m-2 p-2 rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter coin"
          required
        />
        <button type="submit" className="btn">
          Add Coin
        </button>
      </form>
      {coinData.map((coin) => (
        <div key={coin.id}>
          <h3>{coin.id}</h3>
          <p>${coin.current_price}</p>
          <p>
            24hr:
            <span
              className={
                coin.price_change_percentage_24h < 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
          <button onClick={() => deleteCoin(coin.id)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Module2;
