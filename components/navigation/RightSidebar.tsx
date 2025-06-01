import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const RightSidebar = () => {
  const hotQuestions = [
    {
      id: "1",
      title: "What is the best way to learn React?",
    },
    {
      id: "2",
      title: "How do I optimize my Next.js application for performance?",
    },
    {
      id: "3",
      title: "What are the differences between TypeScript and JavaScript?",
    },
    {
      id: "4",
      title: "How can I improve my CSS skills?",
    },
    {
      id: "5",
      title: "What are the best practices for writing clean code?",
    },
  ];

  const popularTags = [
    {
      id: "1",
      title: "React",
      questions: 150,
    },
    {
      id: "2",
      title: "Next.js",
      questions: 120,
    },
    {
      id: "3",
      title: "JavaScript",
      questions: 200,
    },
    {
      id: "4",
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
          {hotQuestions.map(({ id, title }) => (
            <Link
              key={id}
              href={ROUTES.QUESTION(id)}
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
          {popularTags.map(({ id, title, questions }) => (
            <TagCard
              key={id}
              id={id}
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
