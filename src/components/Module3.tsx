import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import AnimatedButton from "@/utils/AnimatedButton";

const Module3: React.FC<{ className?: string }> = ({ className }) => {
  const [ticker, setTicker] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [percentage, setPercentage] = useState<number | null>(null);
  const resultRef = useRef(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);

    if (!isNaN(buy) && !isNaN(sell)) {
      const percent = ((sell - buy) / buy) * 100;
      setPercentage(percent);
    } else {
      alert("Please enter valid numbers for the buy price and sell price.");
    }
  };

  const handleScreenshot = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
    } else {
      console.error("Could not create screenshot: resultRef.current is null");
    }
  };

  return (
    <div className={`p-4 bg-gray-300 shadow-md rounded-md ${className}`}>
      <h2 className="text-xl font-bold">PnL Calculatoor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="m-1 rounded-md text-center"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="ticker"
          required
        />
        <input
          className="m-1 rounded-md text-center"
          type="text"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="buy price"
          required
        />
        <input
          className="m-1 rounded-md text-center"
          type="text"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          placeholder="sell price"
          required
        />
        <AnimatedButton type="submit" className="btn">
          Calculate
        </AnimatedButton>
      </form>
      <div ref={resultRef}>
        {percentage !== null && (
          <p className="text-xl">
            {ticker}:{" "}
            <span
              className={`${
                percentage > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {percentage > 0 ? "+" : ""}
              {percentage.toFixed(2)}%
            </span>
          </p>
        )}
      </div>

      <AnimatedButton className="btn" onClick={handleScreenshot}>
        Screenshot
      </AnimatedButton>
    </div>
  );
};

export default Module3;
