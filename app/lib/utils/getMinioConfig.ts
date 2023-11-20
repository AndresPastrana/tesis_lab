import { ClientOptions } from "minio";
export const getMinioConfig = (): ClientOptions => {
  const endPoint = process.env.MINIO_SERVER_URL as string;
  const port = process.env.MINIO_SERVER_PORT as string;
  const accessKey = process.env.MINIO_ACCESS_KEY as string;
  const secretKey = process.env.MINIO_SECRET_KEY as string;
  return {
    endPoint,
    accessKey,
    secretKey,
    port: Number(port),
  };
};
