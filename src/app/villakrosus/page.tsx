"use client";

import { useState } from "react";
import TickerForm from "../../components/TickerForm";
import TickerList from "../../components/TickerList";
import ReportGenerator from "../../components/ReportGenerator";
import "../StockApp.css";
import Image from "next/image";

export default function VillaKrosus() {
  const [tickers, setTickers] = useState<string[]>([]);

  const addTicker = (ticker: string) => {
    setTickers((prev) => [...prev, ticker]);
  };

  return (
    <div className="stock-app">
      <header>
        <Image
          src="/Krosus_Sork.png"
          alt="Krösus Sork"
          width={500}
          height={500}
        />
        <span>Krösus Sorks Stock Advice</span>
        <p>If you loose, dont blame me!</p>
        <p>But if you win, I want 50%</p>
      </header>
      <main>
        <section>
          <TickerForm onAddTicker={addTicker} />
          <TickerList tickers={tickers} />
          <ReportGenerator setTickers={setTickers} tickers={tickers} />
        </section>
      </main>
      <footer>&copy; This is not real financial advice!</footer>
    </div>
  );
}
