export default function EmptyState({ title = "No data found", description, actionLabel, onAction }) {
  return (
    <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}