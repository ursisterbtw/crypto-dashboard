import React, { useState, useRef } from "react";
import AnimatedButton from "@/utils/AnimatedButton";
import FontFaceObserver from "fontfaceobserver";

const Module3: React.FC<{ className?: string }> = ({ className }) => {
  const [ticker, setTicker] = useState("");
  const [buyPrice, setBuyAmount] = useState("");
  const [sellPrice, setSellAmount] = useState("");
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
      image.onload = async () => {
        ctx.drawImage(image, 0, 0, 1200, 675);

        // waits for the "Kiln Serif Regular" font to be loaded
        const font = new FontFaceObserver("kiln-serif");
        await font.load();

        // uses the loaded font for rendering text on the canvas
        const fontSize = "48px";
        const fontSetting = `${fontSize} 'kiln-serif', sans-serif`;

        ctx.font = fontSetting;
        ctx.textAlign = "left";

        const xOffset = 725;
        const yOffset = 250;
        const lineSpacing = 60;

        ctx.fillStyle = "#5f483a";
        ctx.fillText(`coin: $${ticker}`, xOffset, yOffset);
        ctx.fillText(`bought: $${buyPrice}`, xOffset, yOffset + lineSpacing);
        ctx.fillText(`sold: $${sellPrice}`, xOffset, yOffset + 2 * lineSpacing);

        // applies red/green logic for the percentage and multiplier
        ctx.fillStyle = percentage > 0 ? "green" : "red";
        ctx.fillText(
          `pnl: ${percentage > 0 ? "+" : " "}${percentage.toFixed(2)}%`,
          xOffset,
          yOffset + 3 * lineSpacing
        );

        const multiplier = (1 + percentage / 100).toFixed(2) + "x";
        ctx.fillText(multiplier, xOffset, yOffset + 4 * lineSpacing);

        // opens the newly generated image in a new tab
        const newWindow = window.open();
        newWindow.document.write(
          `<img src="${canvas.toDataURL("image/png")}" alt="Generated Image"/>`
        );
      };
    }
  };

  return (
    <div
      className={`p-4 bg-gray-400 bg-opacity-50 shadow-md rounded-md ${className}`}
    >
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
          onChange={(e) => setBuyAmount(e.target.value)}
          placeholder="buy amount"
          required
        />
        <input
          className="m-1 rounded-md text-center"
          type="text"
          value={sellPrice}
          onChange={(e) => setSellAmount(e.target.value)}
          placeholder="sell amount"
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
