import React from "react";
// Page to edit a court
// Need to read the searchParams
const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const court_id = params.id;

  //   TODO: fetch court info here
  //  TODO: Add Breadcum
  //   Render CourtForm
  return <div>page</div>;
};

export default page;
