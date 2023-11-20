// TODO define what info

interface Document {
  title: string;
  author: string;
  createdAt?: Date;
  institution: string;
  fileUrl: string;
}
const DocumentCard: React.FC<Document> = ({
  title,
  author,
  createdAt,
  institution,
  fileUrl,
}) => {
  return (
    <div className="max-w-md md:max-w-xl  mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex md:flex-row">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full md:h-full md:w-48  object-cover "
            src="https://via.placeholder.com/150" // Replace with an actual image URL or use a placeholder
            alt="Document Thumbnail"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500">{author}</p>
          {/* <p className="mt-2 text-gray-500">{createdAt.toLocaleDateString()}</p> */}
          <p className="mt-2 text-gray-500">{institution}</p>
          <div className="mt-4 flex justify-between">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              View Document
            </a>
            <div className="flex">
              <button className="bg-green-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-green-700">
                Download
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-green-700">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
