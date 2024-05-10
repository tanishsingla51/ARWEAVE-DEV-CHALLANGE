import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Create Post
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Create a post with a title and a description
          </p>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={async () => {
                await axios.post(
                  "http://localhost:4000/api/v2/post/create",
                  {
                    title: title,
                    description: description,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                navigate("/dashboard");
              }}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
