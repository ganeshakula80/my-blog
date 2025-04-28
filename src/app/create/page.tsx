import React from "react";

const CreateBlog = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Create a New Blog</h1>
      {/* Add your form or content here */}
      <form>
        <div>
          <label htmlFor="title" className="block mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="content" className="block mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            className="p-2 border border-gray-300 rounded w-full"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
