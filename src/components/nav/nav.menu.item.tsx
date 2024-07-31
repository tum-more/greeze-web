"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { PropsWithRef } from "react";

type Props = {
  label?: string;
  href: string;
  className?: string;
};

export function NavMenuItem({
  className,
  ...props
}: React.PropsWithChildren<Props>) {
  const { label, href, children } = props;
  const segment = useSelectedLayoutSegment();
  console.log("segment", segment);

  const isActivated = `/${segment}` === href;

  return (
    <Link
      key={(label ?? "") + href}
      className={cn(
        "text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200",
        className,
        {
          "text-primary": isActivated,
        }
      )}
      aria-current={isActivated ? "page" : undefined}
      {...props}
    >
      {label ?? children}
    </Link>
  );
}
