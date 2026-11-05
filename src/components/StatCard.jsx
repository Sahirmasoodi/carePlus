export default function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <div className="stat-card-top">
        <span>{label}</span>
        <i>
          <Icon size={18} />
        </i>
      </div>
      <strong>{value ?? "—"}</strong>
      <small>{note}</small>
    </article>
  );
}
