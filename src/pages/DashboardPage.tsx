import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/r-table/StatusBadge";
import type { Column, Test } from "../types";
import Table from "../components/r-table/Table";
import { useTests } from "../hooks/useTests";
import { useEffect } from "react";
import { Eye, SquarePen, Trash2 } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { tests, loading, loadTests } = useTests();

  useEffect(() => {
    loadTests();
  }, [loadTests]);
  const columns: Column<Test>[] = [
    {
      key: "name",
      title: "Test Name",
      sortable: true,
    },
    {
      key: "subject",
      title: "Subject",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "created_at",
      title: "Created Date",
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Eye color="#384EC7" onClick={() => navigate(`/tests/${row.id}`)} className="cursor-pointer"/>
          <SquarePen
            color="#384EC7"
            onClick={() => navigate(`/tests/${row.id}/edit`)}
            className="cursor-pointer"
          />
          <Trash2 color="#f04b39" className="cursor-pointer"/>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} data={tests} loading={loading} />
    </div>
  );
};

export default DashboardPage;
