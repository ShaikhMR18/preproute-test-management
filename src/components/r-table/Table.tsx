import { useMemo, useRef, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { TableProps } from "../../types";

function Table<T>({ columns, data, loading = false }: TableProps<T>) {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();

      const dropdownHeight = 180; 
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenUp(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
    }

    setIsOpen((prev) => !prev);
  };
  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const valueA = (a as Record<string, unknown>)[sortBy as string];
      const valueB = (b as Record<string, unknown>)[sortBy as string];

      if (String(sortBy) === "created_at") {
        return direction === "asc"
          ? new Date(String(valueA)).getTime() -
              new Date(String(valueB)).getTime()
          : new Date(String(valueB)).getTime() -
              new Date(String(valueA)).getTime();
      }

      return direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [data, sortBy, direction]);

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
  };

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;

    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const startRecord =
    sortedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endRecord = Math.min(currentPage * rowsPerPage, sortedData.length);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className=" overflow-auto max-h-[550px]">
        <table className="min-w-full overflow-hidden">
          <thead className="sticky top-0 z-50 bg-[#F8FAFC]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() =>
                    column.sortable && handleSort(column.key as keyof T)
                  }
                  className={`px-6 py-2 text-left text-sm font-semibold text-gray-700 ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.title}

                    {column.sortable &&
                      sortBy === column.key &&
                      (direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center text-gray-400"
                >
                  No Records Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-1.5 text-sm text-gray-700"
                    >
                      {column.render
                        ? column.render(row)
                        : String(
                            (row as Record<string, unknown>)[
                              column.key as string
                            ] ?? "",
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-6 py-1 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Rows per page</span>

          <div className="relative w-28" ref={dropdownRef}>
            <button
              onClick={handleToggle}
              className="flex h-8 w-full items-center justify-between rounded-lg border px-3"
            >
              <span>{rowsPerPage}</span>
              <ChevronDown
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div
                className={`absolute left-0 z-50 w-full rounded-lg border bg-white shadow-lg ${
                  openUp ? "bottom-full mb-2" : "top-full mt-2"
                }`}
              >
                {[15, 25, 50, 100].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setRowsPerPage(size);
                      setCurrentPage(1);
                      setIsOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      rowsPerPage === size ? "bg-[#EEF3FF] text-[#384EC7]" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <span className="text-sm text-gray-600">
          {startRecord}-{endRecord} of {sortedData.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm font-medium">
            {currentPage} / {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
