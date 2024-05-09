import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v2/post/allposts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="app p-4">
      <h2 className="text-2xl font-bold mb-4">All Existing Posts📫</h2>
      {posts.length > 0 ? (
        posts.map((post, index) => {
          return (
            <div key={index} className="border rounded-md p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
              <div className="mt-2">
                {/* Add delete button or any additional content here */}
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-lg font-semibold text-gray-600">No Posts Found</h2>
      )}
    </div>
  );
};

export default AllPost;
