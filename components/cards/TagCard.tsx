import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { cn, getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: TagCardProps) => {
  const iconClass = getDeviconClassName(name);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const Content = () => (
    <>
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500
      rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2">
        <div className="flex-center space-x-2">
          <i className={cn(iconClass, "text-sm")} />
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
            src="/icons/close.svg"
            alt="Remove tag"
            width={12}
            height={12}
          />
        )}
      </Badge>
      {showCount && (
        <span className="small-medium text-dark500_light700">{questions}</span>
      )}
    </>
  );

  if (compact) {
    return isButton ?
        <button
          className="flex justify-between gap-2"
          type="button"
          onClick={handleClick}>
          <Content />
        </button>
      : <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
          <Content />
        </Link>;
  }
};
export default TagCard;
