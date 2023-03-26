import React from "react";
import { classNames } from "app/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";

// Include menu component for custom navigation options

const demoViews = [
  {
    name: "Pending",
    code: "pending",
  },
  {
    name: "Ongoing",
    code: "ongoing",
  },
  {
    name: "Completed",
    code: "completed",
  },
  {
    name: "Draft",
    code: "drafted",
  },
];

export default function Component({
  views = demoViews,
  navType = "view",
  extraClasses = "",
}) {
  const router = useRouter();

  return (
    <div className="relative bg-white">
      <nav className="flex -mb-px space-x-10 border-b-2 border-b-gray-200">
        {views.map((option, idx) => {
          const { pathname, asPath } = router;
          const { view = "" } = router?.query;
          const { name, code = "", path } = option;
          // console.log(path, pathname);
          const isSelected =
            navType === "view" ? code === view : path === asPath;
          const query = _.pickBy({ view: code, page: undefined }, _.identity); // can't be like this because of filtering
          const href = navType === "view" ? { pathname, query } : path;
          return (
            <Link href={href} passHref key={idx}>
              <a
                className={classNames(
                  isSelected
                    ? "font-normal text-primary border-primary"
                    : "font-normal text-gray-300 border-transparent",
                  "py-2 px-4 text-sm transition-all duration-200 border-b-2 hover:border-green-400 hover:text-primary whitespace-nowrap",
                  extraClasses
                )}
              >
                {name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
