import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/requests");
      setRequests(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <Loader label="Fetching assistance requests..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRequests} />;
  if (requests.length === 0) {
    return (
      <EmptyState
        title="No requests available"
        description="There are currently no NGO assistance requests logged."
        actionLabel="Create New Request"
        onAction={() => console.log("Navigate to create request")}
      />
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto my-6">
      <h2 className="text-xl font-bold">Assistance Requests</h2>
      {requests.map((item) => (
        <div key={item.id} className="p-4 bg-white border rounded shadow-sm">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}