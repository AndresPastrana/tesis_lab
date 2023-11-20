import { BookOpenIcon } from "@heroicons/react/20/solid";

import { RepositoryPageText } from "@/app/i18/text";

const SearchHeader = () => {
  const { headerText } = RepositoryPageText["es"];
  return (
    <header className=" p-4 rounded-t-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className=" text-2xl md:text-3xl font-bold inline-block bg-gradient-to-r from-green-700 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            {headerText}
          </h1>
        </div>
        <div className="flex items-center">
          <BookOpenIcon className="h-8 w-8 mr-2 text-green-900" />
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
