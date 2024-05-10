import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPost = () => {
  const [user, setUser] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v2/user/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setFollowing(response.data.following);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="app p-4 ">
      <div className="flex">
        <h2 className="text-2xl font-bold mb-4 pr-64">Users Details</h2>
        <Link to="/update" className="text-white">
          <button className="bg-black p-3 border rounded-full">
            Update User
          </button>
        </Link>

        <br />
        <Link to="/users" className="text-white">
          <button className="bg-black p-3 border rounded-full">
            All Users Details{" "}
          </button>
        </Link>
      </div>
      <div className="gap-4 border border-gray p-4 rounded-sm">
        <div>
          <p className="text-lg font-semibold">Username:</p>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">First Name:</p>
          <p className="text-gray-700">{user.firstName}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Last Name:</p>
          <p className="text-gray-700">{user.lastName}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Following:</p>
          <p className="text-gray-700">{following.length}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Followers:</p>
          <p className="text-gray-700">{followers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
