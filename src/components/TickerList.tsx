type ListProps = {
  tickers: string[];
};

export default function TickerList({ tickers }: ListProps) {
  return (
    <p className="ticker-info">
      Selected Tickers: {tickers.length > 0 ? tickers.join(", ") : "None"}
    </p>
  );
}
