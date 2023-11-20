import MinioService from "@/app/lib/models/MinioService";
import { NextResponse } from "next/server";

type ParamsType = {
  prefix: string;
  name: string;
};
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Extract the bucket name and the file name from the url
  const bucket_name = searchParams.get("bucket_name") as string;
  const file_name = searchParams.get("file_name") as string;

  // TODO: Validate query with zod

  const minio = MinioService.getInstance(); //Use the minio service to get thr file buffer
  const bufferData = await minio.getFile(bucket_name, file_name);

  // Crea un nuevo documento PDF desde el buffer
  // const pdfDoc = await PDFDocument.load(bufferData);

  // Response
  // const res = new NextResponse();
  // res.headers.set("Content-Type", "application/pdf");
  // res.headers.set("Content-Disposition", `attachment; filename=${file_name}`);
  return new Response(bufferData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${file_name}`,
    },
  });
}
