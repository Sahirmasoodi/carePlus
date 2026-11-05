import { Link } from "react-router-dom";
export default function Brand({ light = false }) {
  return (
    <Link className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-symbol">✚</span>
      <span>
        Care<span>Plus</span>
        <small>CONNECTED HEALTHCARE</small>
      </span>
    </Link>
  );
}
