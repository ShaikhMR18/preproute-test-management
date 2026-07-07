import { useMatch } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "./Header";
import QuestionNavigation from "../components/questions/QuestionNavigation";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isQuestionPage = Boolean(useMatch("/tests/:id/questions"));

  const [openQuestionDrawer, setOpenQuestionDrawer] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFF]">
      <Sidebar  />

      {isQuestionPage && (
        <QuestionNavigation
          open={openQuestionDrawer}
          onToggle={() => setOpenQuestionDrawer((prev) => !prev)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-4 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;