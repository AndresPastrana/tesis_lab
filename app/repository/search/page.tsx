import DocsGrid from "@/app/ui/repository/DocsGrid";
import SearchForm from "@/app/ui/repository/SearchForm";
import SearchHeader from "@/app/ui/repository/SearchHeader";
import React, { Suspense } from "react";
const page = ({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) => {
  const query = searchParams.query || "";
  return (
    <div>
      <SearchHeader />
      <SearchForm />
      <Suspense key={query + Date.now()} fallback={<h1>Loading......</h1>}>
        <DocsGrid query={query} />
      </Suspense>
    </div>
  );
};

export default page;
