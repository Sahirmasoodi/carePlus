import { X } from "lucide-react";
export default function Modal({ title, onClose, children, wide = false }) {
  return (
    <div
      className="modal-scrim"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className={`modal-card ${wide ? "modal-wide" : ""}`}>
        <header>
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
