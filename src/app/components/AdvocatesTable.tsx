import { formatSpecialties, formatPhoneNumber } from "../utils/formatters";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Advocate } from "../models/advocate";

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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  return (
    <div>
      {/* Page Size Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8 py-4" style={{ marginTop: "1rem", marginBottom: "1rem"}}>
        <label htmlFor="page-size" className="text-gray-700 text-sm font-medium sm:pr-2">Rows per page:</label>
        <select
          id="page-size"
          className="border border-[#b5c9d6] rounded px-2 py-1 text-base bg-[#f7fafc] focus:outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#e6f2ff] w-full sm:w-auto sm:text-base"
          value={limit}
          onChange={e => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="text-red-600 font-semibold mt-4">Error: {error}</p>
      ) : (
        <div className="relative">
          <div className="overflow-x-auto">
            {totalPages > 1 && (
              <div className="mb-4 flex gap-2 items-center flex-wrap">
                {pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`rounded-md px-3 py-1 sm:px-4 sm:py-2 font-semibold border-none cursor-pointer transition-all duration-150 text-sm sm:text-base
          ${
            p === page
              ? "bg-[#347866] text-white border-2 border-[#255B4E] scale-105 shadow-md"
              : "bg-[#e6f2ff] text-[#347866] border border-transparent hover:bg-[#38b2ac] hover:text-white active:bg-[#38b2ac] active:text-white"
          }
        `}
                    disabled={p === page}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <table className="w-full min-w-[600px] border-separate border-spacing-0 mt-8 bg-[#f9fbfd] rounded-xl overflow-hidden shadow-md text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    First Name
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    Last Name
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    City
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    Degree
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    Specialties
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    Years of Experience
                  </th>
                  <th className="py-2 px-2 sm:py-4 sm:px-3 text-left text-base sm:text-lg font-bold bg-[#347866] text-white">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {advocates.map((advocate, idx) => (
                  <tr
                    key={
                      advocate.id || `${advocate.firstName}-${advocate.lastName}`
                    }
                    className={
                      idx % 2 === 0
                        ? "bg-[#f1f7fa]"
                        : "bg-white hover:bg-[#e6f2ff]"
                    }
                  >
                    <td className="py-2 px-2 sm:py-3 sm:px-3">{advocate.firstName}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">{advocate.lastName}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">{advocate.city}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">{advocate.degree}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                      {formatSpecialties(advocate.specialties)}
                    </td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">{advocate.yearsOfExperience}</td>
                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                      <a
                        href={`tel:${advocate.phoneNumber}`}
                        className="text-[#347866] underline font-medium text-sm sm:text-base"
                      >
                        {formatPhoneNumber(advocate.phoneNumber)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex gap-2 items-center flex-wrap">
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-md px-3 py-1 sm:px-4 sm:py-2 font-semibold border-none cursor-pointer transition-all duration-150 text-sm sm:text-base
          ${
            p === page
              ? "bg-[#347866] text-white border-2 border-[#255B4E] scale-105 shadow-md"
              : "bg-[#e6f2ff] text-[#347866] border border-transparent hover:bg-[#38b2ac] hover:text-white active:bg-[#38b2ac] active:text-white"
          }
        `}
                  disabled={p === page}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default AdvocatesTable;