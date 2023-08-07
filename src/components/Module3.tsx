import React, { useState, useRef } from "react";
import AnimatedButton from "@/utils/AnimatedButton";

const Module3: React.FC<{ className?: string }> = ({ className }) => {
  const [ticker, setTicker] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [percentage, setPercentage] = useState<number | null>(null);

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
    if (percentage !== null) {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 675;
      const ctx = canvas.getContext("2d");

      const image = new Image();
      image.src = "/bull.png";
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 1200, 675);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(800, 280, 300, 115);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";

        ctx.fillText(`Ticker: ${ticker}`, 810, 310);
        ctx.fillText(`Buy Price: $${buyPrice}`, 810, 335);
        ctx.fillText(`Sell Price: $${sellPrice}`, 810, 360);
        ctx.fillText(
          `Gain/Loss: ${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%`,
          810,
          385
        );

        // Open the newly generated image in a new tab
        const newWindow = window.open();
        newWindow.document.write(
          `<img src="${canvas.toDataURL("image/png")}" alt="Generated Image"/>`
        );
      };
    }
  };

  return (
    <div className={`p-4 bg-gray-400 shadow-md rounded-md ${className}`}>
      <h2 className="text-lg">PnL Calculatoor</h2>
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
      <div className="mb-1">
        {percentage !== null && (
          <p className="text-xl">
            {ticker}:{" "}
            <span
              className={`${
                percentage > 0 ? "text-green-600" : "text-red-600"
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
