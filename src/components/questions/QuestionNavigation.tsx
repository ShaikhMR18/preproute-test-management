import { useGetTestById } from "../../hooks/useTest";
import { DrawerIcon, MarkIcon, TickIcon } from "../../assets";

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
        className="absolute left-55 top-36 z-50 flex h-7 w-7 items-center justify-cente cursor-pointer"
      >
        {open ? (
          <DrawerIcon width={20} height={20} />
        ) : (
          <DrawerIcon
            width={20}
            height={20}
            className={`${!open ? "rotate-180" : ""} transition-transform duration-300`}
          />
        )}
      </button>

      {/* Drawer */}
      <aside
        className={`
          absolute
          top-12
           ${open ? "left-15" : "-left-64"}
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
              <div className="flex items-center justify-around gap-3 rounded-md border border-[#2ECC71] bg-[#F6FFF9] px-3 py-1 cursor-pointer">
                <TickIcon width={12} height={10} />
                <span className="text-xs font-medium text-[#27AE60]">
                  Question {ind + 1}
                </span>
                <MarkIcon width={10} height={10} />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default QuestionNavigation;
