import { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import AnimatedButton from "@/utils/AnimatedButton";

const Module4: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [swaps, setSwaps] = useState<any[]>([]);

  // Initialize Moralis only once
  useEffect(() => {
    const initMoralis = async () => {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        // ...any other configuration if necessary
      });
    };
    initMoralis();
  }, []);

  useEffect(() => {
    const fetchSwaps = async () => {
      if (addresses.length > 0) {
        const newSwaps = await Promise.all(
          addresses.map(async (address) => {
            return await Moralis.EvmApi.token.getWalletTokenTransfers({
              address,
              chain: EvmChain.ETHEREUM,
            });
          })
        );
        setSwaps(newSwaps);
      }
    };

    const interval = setInterval(fetchSwaps, 30000);
    return () => clearInterval(interval);
  }, [addresses]);

  const addAddress = () => {
    if (input) {
      setAddresses((prevAddresses) => [...prevAddresses, input]);
      setInput("");
    }
  };

  const formatAddress = (address: string) => {
    return address.slice(0, 4) + "{...}" + address.slice(-4);
  };

  return (
    <div className="p-4 bg-gray-400 bg-opacity-50 shadow-md rounded-md text-sm">
      <h2 className="text-base mb-4">ERC20 Swap History</h2>
      <input
        className="text-center w-full m-2 p-2 rounded-md"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Ethereum Address"
      />
      <AnimatedButton onClick={addAddress} className="btn">
        Add Address
      </AnimatedButton>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-base mb-2">Added Addresses:</h2>
          {addresses.map((address, i) => (
            <div key={i} className="mb-2">
              Address: {formatAddress(address)}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-base mb-2">Live ERC20 Swaps:</h2>
          {swaps.map((swap, i) => (
            <div key={i} className="mb-2">
              <h3 className="mb-2">Address: {formatAddress(addresses[i])}</h3>
              <ul className="pl-4">
                {swap.result.map((s: any, j: number) => (
                  <li key={j}>
                    Transaction Hash: {s.transaction_hash}
                    {/* Add more fields as necessary */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module4;
