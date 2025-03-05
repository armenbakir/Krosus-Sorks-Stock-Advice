import Link from "next/link";
import "./StartButton.css";

export default function StartButton() {
  return (
    <div className="start-page">
      <Link href="/villakrosus">
        <button className="start-page-btn">Stock prediction</button>
      </Link>
    </div>
  );
}
