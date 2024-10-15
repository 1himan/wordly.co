import Swal from "sweetalert2";

interface ArticleActionsProps {
  isEditable: boolean;
  //In TS (and JS), void is a type that represents the absence of any value.
  handleEditClick: () => void;
  handleDelete: () => void;
  handlePublish: () => void;
}
//*React.FC<ArticleActionsProps> This specifies that ArticleActions is a React Functional Component (FC)
//*that expects props matching the ArticleActionsProps interface.
const ArticleActions: React.FC<ArticleActionsProps> = ({
  isEditable,
  handleEditClick,
  handleDelete,
  handlePublish,
}) => {
  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
      }
    });
  };

  return (
    <div className="flex gap-4">
      {!isEditable && (
        <button onClick={handleEditClick}>
          <p className="flex gap-1 cursor-pointer text-green-900 rounded-md text-xs py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            Edit
          </p>
        </button>
      )}
      {!isEditable && (
        <button onClick={confirmDelete}>
          <p className="flex gap-1 cursor-pointer text-red-600 rounded-md text-xs py-1">
            Delete
          </p>
        </button>
      )}
      {isEditable && (
        <button onClick={handlePublish}>
          <p className="cursor-pointer bg-[#50E3C2] px-2 py-1 text-white rounded-md text-xs">
            Done
          </p>
        </button>
      )}
    </div>
  );
};

export default ArticleActions;
