import { useMatch } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "./Header";
import QuestionNavigation from "../components/questions/QuestionNavigation";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/r-Buttton/Button";
import { useGetTestById } from "../hooks/useTest";
import { usePublishTest } from "../hooks/usePulishTest";
import { showSuccess } from "../utils/toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isQuestionPage = Boolean(useMatch("/tests/:id/questions"));
  const isEditPage = Boolean(useMatch("/tests/:id/edit"));
  const { test } = useGetTestById();
  const { publishTest } = usePublishTest();
  const [openQuestionDrawer, setOpenQuestionDrawer] = useState(true);
  const isCompleted =
    (test?.questions?.length ?? 0) >= (test?.total_questions ?? 0);
  const items = isCompleted
    ? [{ label: "Test Creation" }]
    : isQuestionPage
      ? [
          { label: "Test Creation" },
          { label: "Create Test" },
          { label: "Chapter Wise" },
        ]
      : isEditPage
        ? [{ label: "Edit Test" }]
        : [{ label: "Test Creation" }];
  const handlePublish = async () => {
    try {
      if (!test?.id) return;

      const response = await publishTest(test.id);
      if (response?.status === "success") {
        showSuccess(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFF]">
      <Sidebar />

      {isQuestionPage && (
        <QuestionNavigation
          open={openQuestionDrawer}
          onToggle={() => setOpenQuestionDrawer((prev) => !prev)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <Breadcrumb
          items={items}
          action={
            isQuestionPage && !isCompleted ? (
              <Button onClick={handlePublish}>Publish</Button>
            ) : null
          }
        />
        <main className="flex-1 overflow-auto p-4 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
