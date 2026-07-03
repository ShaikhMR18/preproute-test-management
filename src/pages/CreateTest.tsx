import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DropDown from "../components/r-DropDown/DropDown";
import Input from "../components/r-Input/Input";
import Radio from "../components/r-radio/Radio";
import Button from "../components/r-Buttton/Button";

import { useSubjects } from "../hooks/useSubjects";
import { useTopics } from "../hooks/useTopics";
import { useSubTopics } from "../hooks/useSubTopic";

import { createTestSchema } from "./Schema";

type CreateTestInput = z.input<typeof createTestSchema>;
type CreateTestOutput = z.output<typeof createTestSchema>;

const CreateTest: React.FC = () => {
  const { subjects, loadSubjects } = useSubjects();
  const { topics, loadTopics } = useTopics();
  const { subTopics: sTopic, loadSubTopics } = useSubTopics();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    // trigger,
    clearErrors,
    formState: { errors },
  } = useForm<CreateTestInput, unknown, CreateTestOutput>({
    resolver: zodResolver(createTestSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      subTopic: "",
      difficulty: "easy",
      totalTime: 0,
      wrongMarks: -1,
      unattemptMarks: 0,
      correctMarks: 4,
      totalQuestions: 0,
      totalMarks: 0,
    },
  });

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  const onSubmit = (data: CreateTestOutput) => {
    console.log(data);
  };

  const subjectOptions = useMemo(
    () =>
      subjects.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [subjects],
  );
  useEffect(() => {
    register("subject");
    register("topic");
    register("subTopic");
  }, [register]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Create Test</h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new test by filling the information below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <DropDown
            label="Subject"
            placeholder="Select Subject"
            options={subjectOptions}
            value={watch("subject") || ""}
            onChange={(value) => {
              setValue("subject", value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              clearErrors("subject");

              loadTopics(value);
            }}
          />

          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        <Input
          label="Name Of Test"
          {...register("name")}
          error={errors.name?.message}
        />
        <div>
          <DropDown
            label="Topic"
            placeholder="Select Topic"
            options={topics.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={watch("topic") || ""}
            onChange={(value) => {
              setValue("topic", value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              clearErrors("topic");

              loadSubTopics(value);
            }}
          />

          {errors.topic && (
            <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>
          )}
        </div>
        <div>
          <DropDown
            label="Sub Topic"
            placeholder="Select Sub Topic"
            options={sTopic.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={watch("subTopic") || ""}
            onChange={(value) => {
              setValue("subTopic", value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              clearErrors("subTopic");
            }}
          />

          {errors.subTopic && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subTopic.message}
            </p>
          )}
        </div>
        <Input
          label="Duration"
          type="number"
          {...register("totalTime", { valueAsNumber: true })}
          error={errors.totalTime?.message}
        />

        <div>
          <label className="mb-5 block text-sm font-medium text-[#2E3446]">
            Difficulty Level
          </label>

          <Radio
            name="difficulty"
            value={watch("difficulty")}
            onChange={(value) =>
              setValue("difficulty", value as "easy" | "medium" | "difficult")
            }
            direction="row"
            options={[
              {
                label: "Easy",
                value: "easy",
              },
              {
                label: "Medium",
                value: "medium",
              },
              {
                label: "Difficult",
                value: "difficult",
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">
          Marking Scheme
        </h3>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
          <Input
            label="Wrong Answer"
            type="number"
            placeholder="-1"
            {...register("wrongMarks", { valueAsNumber: true })}
            error={errors.wrongMarks?.message}
          />

          <Input
            label="Unattempt Marks"
            type="number"
            placeholder="0"
            {...register("unattemptMarks", { valueAsNumber: true })}
            error={errors.unattemptMarks?.message}
          />

          <Input
            label="Correct Answer"
            type="number"
            placeholder="4"
            {...register("correctMarks", { valueAsNumber: true })}
            error={errors.correctMarks?.message}
          />

          <Input
            label="No Of Questions"
            type="number"
            placeholder="50"
            {...register("totalQuestions", { valueAsNumber: true })}
            error={errors.totalQuestions?.message}
          />

          <Input
            label="Total Marks"
            type="number"
            placeholder="250"
            {...register("totalMarks", { valueAsNumber: true })}
            error={errors.totalMarks?.message}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
        <Button type="button" variant="secondary">
          Cancel
        </Button>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default CreateTest;