import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetTestById } from "../../hooks/useTest";

type Props = {
  open: boolean;
  onToggle: () => void;
};

const QuestionNavigation = ({ open, onToggle }: Props) => {
  const { test } = useGetTestById();
  console.log("testred", test);
  const questions = test?.questions?.map((question) => question);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute left-[72px] top-36 z-50 flex h-7 w-7 items-center justify-center rounded-full border bg-white shadow"
      >
        {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Drawer */}
      <aside
        className={`
          absolute
          left-15
          top-12
          z-40
          h-[calc(100vh-80px)]
          mt-8
          w-49
          bg-white
          shadow-lg
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5">
          <h3 className="text-lg font-semibold">Question Creation</h3>

          <p className="mt-6 text-sm">
            Total Questions :
            <span className="ml-1 font-semibold">{test?.total_questions}</span>
          </p>

          <div
            className="
              mt-6
              flex-1
              overflow-y-auto
              pr-1
              space-y-3
               max-h-96
            "
          >
            {questions?.map((_, ind) => (
              <button
                key={ind}
                className="flex w-full items-center justify-between rounded-xl border border-[#2ECC71] px-4 py-2 hover:bg-[#F8FFF9] cursor-pointer"
              >
                <span>Question {ind + 1}</span>

                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default QuestionNavigation;
