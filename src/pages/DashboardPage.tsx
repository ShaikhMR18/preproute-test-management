import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";

import Table from "../components/r-table/Table";
import StatusBadge from "../components/r-table/StatusBadge";
import { useTests } from "../hooks/useTests";
import type { Test } from "../types";
import { useDeleteTest } from "../hooks/useDeleteTest";
import { showSuccess } from "../utils/toast";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { tests, loading, loadTests } = useTests();
  const { deleteTest } = useDeleteTest();
  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleDeleteTest = async (testId: string) => {
    const resp = await deleteTest(testId);
    if (resp?.status === "success") {
      showSuccess(resp?.message);
      await loadTests();
    }
  };
  const columns = useMemo<ColumnDef<Test>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Test Name",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
        cell: ({ row }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Eye
              color="#384EC7"
              className="cursor-pointer"
              onClick={() => navigate(`/tests/${row.original.id}/questions`)}
            />

            <SquarePen
              color="#384EC7"
              className="cursor-pointer"
              onClick={() => navigate(`/tests/${row.original.id}/edit`)}
            />

            <Trash2
              color="#f04b39"
              className="cursor-pointer"
              onClick={() => {
                handleDeleteTest(row.original.id);
              }}
            />
          </div>
        ),
      },
    ],
    [navigate],
  );

  return <Table columns={columns} data={tests} loading={loading} />;
};

export default DashboardPage;
