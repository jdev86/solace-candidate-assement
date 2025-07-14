import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Advocate } from "../models/advocate";
import AdvocateCard from "./AdvocateCard";
import PaginationControl from "./PaginationControl";

const AdvocatesTable = ({
  searchTerm,
  page,
  setPage,
}: {
  searchTerm: string;
  page: number;
  setPage: (p: number) => void;
}) => {
  const DEFAULT_PAGE_SIZE = 5;

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination controls
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      search: searchTerm,
      page: page.toString(),
      limit: limit.toString(),
    });
    fetch(`/api/advocates?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setTotal(jsonResponse.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm, page, limit]);

  return (
    <div>
      {/* Page Size Selector */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8 py-4"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <label
          htmlFor="page-size"
          className="text-gray-700 text-sm font-medium sm:pr-2"
        >
          Rows per page:
        </label>
        <select
          id="page-size"
          className="border border-[#b5c9d6] rounded px-2 py-1 text-sm bg-[#f7fafc] focus:outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#e6f2ff] w-full sm:w-auto sm:text-base"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="text-red-600 font-semibold mt-4">Error: {error}</p>
      ) : (
        <div className="relative">
          {totalPages > 1 && (
            <PaginationControl setPage={setPage} pages={pages} page={page} />
          )}
          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
            {advocates.map((advocate, idx) => (
              <AdvocateCard
                key={
                  advocate.id || `${advocate.firstName}-${advocate.lastName}`
                }
                advocate={advocate}
                className="h-full"
              />
            ))}
          </div>
          {totalPages > 1 && (
            <PaginationControl setPage={setPage} pages={pages} page={page} />
          )}
          {loading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default AdvocatesTable;
