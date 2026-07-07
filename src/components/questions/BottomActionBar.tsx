import type { BottomActionBarProps } from "../../types";
import Button from "../r-Buttton/Button";

const BottomActionBar = ({ onExit, onNext }: BottomActionBarProps) => {
  return (
    <div className="sticky bottom-0 mt-4 flex items-center justify-between border-[#E8ECF4] bg-white px-4 py-3">
      <Button
        type="button"
        variant="danger"
        className="rounded-lg bg-[#FF6B6B] px-5 py-2 text-white hover:bg-[#FF5A5A]"
        onClick={onExit}
      >
        Exit Test Creation
      </Button>

      <Button
        type="button"
        variant="primary"
        className="rounded-lg px-10"
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};

export default BottomActionBar;
