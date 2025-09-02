import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
