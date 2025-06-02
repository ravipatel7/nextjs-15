import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { cn, getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface TagCardProps {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount }: TagCardProps) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500
      rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={cn(iconClass, "text-sm")} />
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <span className="small-medium text-dark500_light700">{questions}</span>
      )}
    </Link>
  );
};
export default TagCard;
