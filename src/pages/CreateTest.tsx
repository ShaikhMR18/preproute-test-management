import React, { useEffect, useMemo, useState } from "react";
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
import { useCreateTests, useGetTestById } from "../hooks/useTest";
import type { CreateTestPayload, TestType } from "../components/r-types";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import { useUpdateTest } from "../hooks/useUpdateTest";
import { showSuccess } from "../utils/toast";

type CreateTestInput = z.input<typeof createTestSchema>;
type CreateTestOutput = z.output<typeof createTestSchema>;

const CreateTest: React.FC = () => {
  const navigate = useNavigate();
  const { subjects, loadSubjects } = useSubjects();
  const { topics, loadTopics } = useTopics();
  const { subTopics: sTopic, loadSubTopics } = useSubTopics();
  const { createTest } = useCreateTests();
  const [selectedTab, setSelectedTab] = useState<TestType>("chapterwise");
  const { updateTest } = useUpdateTest();
  const { test, loadTestById, clearSelectedTest } = useGetTestById();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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
      topic: [],
      subTopic: [],
      difficulty: "easy",
      totalTime: 0,
      wrongMarks: -1,
      unattemptMarks: 0,
      correctMarks: 4,
      totalQuestions: 0,
      totalMarks: 0,
    },
  });
  const defaultValues: CreateTestInput = {
    name: "",
    subject: "",
    topic: [],
    subTopic: [],
    difficulty: "easy",
    totalTime: 0,
    wrongMarks: -1,
    unattemptMarks: 0,
    correctMarks: 4,
    totalQuestions: 0,
    totalMarks: 0,
  };
  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  useEffect(() => {
    if (id) {
      loadTestById(id);
    }
  }, [id]);

  useEffect(() => {
    if (!test) return;
    const subjectId = subjects.find((s) => s.name === test.subject)?.id ?? "";
    const topicIds = topics
      .filter((topic) => test.topics.includes(topic.name))
      .map((topic) => topic.id);
    const subTopicIds = sTopic
      .filter((item) => test.sub_topics.includes(item.name))
      .map((item) => item.id);
    console.log("test--", test);
    reset({
      name: test.name,
      subject: subjectId,
      topic: topicIds,
      subTopic: subTopicIds,
      difficulty: test.difficulty,
      totalTime: test.total_time,
      wrongMarks: test.wrong_marks,
      unattemptMarks: test.unattempt_marks,
      correctMarks: test.correct_marks,
      totalQuestions: test.total_questions,
      totalMarks: test.total_marks,
    });

    setSelectedTab(test.type as TestType);

    loadTopics(subjectId);

    topicIds.forEach(loadSubTopics);
  }, [test]);

  useEffect(() => {
    if (!test || sTopic.length === 0) return;

    const subTopicIds = sTopic
      .filter((st) => test.sub_topics.includes(st.name))
      .map((st) => st.id);

    setValue("subTopic", subTopicIds);
  }, [sTopic, test]);

  const mapToPayload = (data: CreateTestOutput): CreateTestPayload => ({
    name: data.name,
    type: selectedTab,
    subject: data.subject,
    topics: data.topic,
    sub_topics: data.subTopic,
    correct_marks: data.correctMarks,
    wrong_marks: data.wrongMarks,
    unattempt_marks: data.unattemptMarks,
    difficulty: data.difficulty,
    total_time: data.totalTime,
    total_marks: data.totalMarks,
    total_questions: data.totalQuestions,
    status: "draft",
  });

  const onSubmit = async (data: CreateTestOutput) => {
    try {
      const payload = mapToPayload(data);

      if (isEdit && id) {
        const response = await updateTest(id, payload);

        if (response.status === "success") {
          showSuccess(response.message);
          navigate(-1);
        }
        return;
      }
      const response = await createTest(payload);
      if (response.status === "success") {
        showSuccess(response.message);
        navigate(`/tests/${response.data.id}/questions`);
      }
    } catch (error) {
      console.error(error);
    }
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
  useEffect(() => {
    if (!isEdit) {
      reset(defaultValues);
      clearSelectedTest();
    }
  }, [isEdit, reset, clearSelectedTest]);

  const handleCancel = () => {
    reset(defaultValues);

    setSelectedTab("chapterwise");

    clearSelectedTest();

    if (isEdit) {
      navigate(-1);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-sm"
      >
        <div className="mb-4">
          <Tabs
            activeTab={selectedTab}
            onChange={(value) =>
              setSelectedTab(value as "chapterwise" | "pyq" | "mock")
            }
            tabs={[
              { label: "Chapterwise", value: "chapterwise" },
              { label: "PYQ", value: "pyq" },
              { label: "Mock Test", value: "mock" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <DropDown
              label="Subject"
              placeholder="Select Subject"
              options={subjectOptions}
              value={watch("subject") || ""}
              onChange={(value) => {
                setValue("subject", value as string, {
                  shouldValidate: true,
                  shouldDirty: true,
                });

                clearErrors("subject");

                loadTopics(value as string);
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
              multiple
              options={topics.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              value={watch("topic")}
              onChange={(value) => {
                const selectedTopics = value as string[];

                setValue("topic", selectedTopics);

                selectedTopics.forEach((id) => {
                  loadSubTopics(id);
                });
              }}
            />

            {errors.topic && (
              <p className="mt-1 text-sm text-red-500">
                {errors.topic.message}
              </p>
            )}
          </div>
          <div>
            <DropDown
              label="Sub Topic"
              multiple
              options={sTopic.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              value={watch("subTopic")}
              onChange={(value) =>
                setValue("subTopic", value as string[], {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
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
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            {isEdit ? "Save" : "Next"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateTest;
