const QuestionSummarySkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-[#E8ECF4] bg-white p-5">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          {/* Type */}
          <div className="h-7 w-28 rounded-full bg-gray-200" />

          {/* Title */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gray-200" />

            <div className="h-8 w-64 rounded-md bg-gray-200" />

            <div className="h-9 w-24 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Edit */}
        <div className="h-8 w-8 rounded-md bg-gray-200" />
      </div>

      {/* Bottom */}
      <div className="mt-10 flex justify-between">
        {/* Left */}
        <div className="space-y-6">
          {/* Subject */}
          <div className="flex items-center">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <span className="mx-3">:</span>
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>

          {/* Topic */}
          <div className="flex items-start">
            <div className="mt-2 h-4 w-20 rounded bg-gray-200" />
            <span className="mx-3 mt-1">:</span>

            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-full bg-gray-200" />
              <div className="h-8 w-32 rounded-full bg-gray-200" />
              <div className="h-8 w-28 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Sub Topic */}
          <div className="flex items-start">
            <div className="mt-2 h-4 w-20 rounded bg-gray-200" />
            <span className="mx-3 mt-1">:</span>

            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-36 rounded-full bg-gray-200" />
              <div className="h-8 w-24 rounded-full bg-gray-200" />
              <div className="h-8 w-20 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-end">
          <div className="flex items-center rounded-lg border border-[#E8ECF4] px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>

            <div className="mx-5 h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>

            <div className="mx-5 h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSummarySkeleton;