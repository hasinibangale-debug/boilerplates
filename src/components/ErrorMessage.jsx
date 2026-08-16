export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
      <span>⚠️ {message || "Something went wrong. Please try again."}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}