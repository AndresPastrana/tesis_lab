"use server";

import { docs } from "@/app/mock/documents";
import DocumentCard from "./DocCard";

// Read the query params and make a fecth
const DocsGrid = ({ query }: { query: string }) => {
  const results = new Promise((res) => res(docs));
  return (
    <section className="mt-20">
      <span className="flex items-baseline gap-4 mb-8">
        {/* <p className="text-lg">{(results?.length as Array) || 0}</p> */}
        <p className="text-gray-600">results</p>
      </span>
      <div className="flex flex-col gap-3">
        {docs.map((doc) => {
          const { author, createdAt, fileUrl, institution, title } = doc;
          return (
            <DocumentCard
              author={author}
              fileUrl={fileUrl}
              institution={institution}
              title={title}
              key={Date.now()}
            />
          );
        })}
      </div>
    </section>
  );
};

export default DocsGrid;
