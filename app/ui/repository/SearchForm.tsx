"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { RepositoryPageText } from "@/app/i18/text";

// Update the url
const SearchForm = () => {
  const { headerText, searchPlaceholder } = RepositoryPageText["es"];
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const params = new URLSearchParams(searchParams);
    if (value.length >= 1) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    // Update the query params
    replace(`${pathname}?${params.toString()}`);
  };
  const debouncedSerach = useDebouncedCallback(handleSearch, 300);
  return (
    <form className="form-control w-full my-10">
      {/* <label className="label" htmlFor="search">
        <span className="label-text">What is your name?</span>
        <span className="label-text-alt">Top Right label</span>
      </label> */}
      <div className="flex items-center relative">
        <input
          type="text"
          name="search"
          defaultValue={searchParams?.get("query") || ""}
          id="search"
          placeholder={searchPlaceholder}
          className="input w-full bg-gray-100 rounded-xl focus:shadow-md   focus:bg-white"
          onChange={debouncedSerach}
        />
        <MagnifyingGlassIcon className=" w-5 h-5 inline absolute left-[90%] sm:left-[95%] " />
      </div>

      {/* Error message here */}
      {/* <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label> */}
    </form>
  );
};

export default SearchForm;
