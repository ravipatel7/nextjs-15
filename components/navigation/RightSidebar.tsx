import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title: "What is the best way to learn React?",
    },
    {
      _id: "2",
      title: "How do I optimize my Next.js application for performance?",
    },
    {
      _id: "3",
      title: "What are the differences between TypeScript and JavaScript?",
    },
    {
      _id: "4",
      title: "How can I improve my CSS skills?",
    },
    {
      _id: "5",
      title: "What are the best practices for writing clean code?",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      title: "React",
      questions: 150,
    },
    {
      _id: "2",
      title: "Next.js",
      questions: 120,
    },
    {
      _id: "3",
      title: "JavaScript",
      questions: 200,
    },
    {
      _id: "4",
      title: "CSS",
      questions: 80,
    },
  ];

  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen
    flex flex-col gap-6 pt-36 w-[350px] overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.QUESTION(_id)}
              className="flex items-center cursor-pointer justify-between gap-7">
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, title, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={title}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
