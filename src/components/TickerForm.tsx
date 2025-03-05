"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  onAddTicker: (ticker: string) => void;
};

export default function TickerForm({ onAddTicker }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length >= 3) {
      onAddTicker(input.toUpperCase());
      setInput("");
    } else {
      alert("A ticker must be at least 3 characters long.");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="ticker-input-form">
      <label htmlFor="ticker-input">
        Add up to 3 stock tickers below to get a super accurate stock
        predictions report👇
      </label>
      <div className="input-container">
        <input
          type="text"
          id="ticker-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="MSFT"
        />
        <button className="add-button" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
}
