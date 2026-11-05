export default function Loading({ label = "Preparing your workspace" }) {
  return (
    <div className="loading-state">
      <span className="loader-ring" />
      <p>{label}</p>
    </div>
  );
}
