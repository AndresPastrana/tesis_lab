import { input_upload_doc_name } from "@/app/const";
import { uploadFile } from "@/app/lib/data/upload";

const form = async () => {
  return (
    <div>
      <form action={uploadFile}>
        <div className="flex flex-col gap-2">
          <label htmlFor="doc_file">Upload your doc</label>
          <input type="file" name={input_upload_doc_name} id="doc_file" />
        </div>

        <div>
          <button type="submit">Send doc</button>
        </div>
      </form>
    </div>
  );
};

export default form;
