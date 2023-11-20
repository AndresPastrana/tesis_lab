export const generateDocUrl = ({
  bucket_name,
  file_name,
}: {
  bucket_name: string;
  file_name: string;
}) => {
  const api_path = "api/docs-server";
  const host = "http://localhost:3000";
  return `${host}/${api_path}?bucket_name=${bucket_name}&file_name=${file_name}`;
};

export default generateDocUrl;
