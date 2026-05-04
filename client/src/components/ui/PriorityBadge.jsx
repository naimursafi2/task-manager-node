export default function PriorityBadge({ priority }) {
  const styles = {
    high: "bg-red-100 text-red-700 border-red-200",
    mid: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${
        styles[priority] || styles.mid
      }`}
    >
      {priority}
    </span>
  );
}