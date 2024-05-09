import { useEffect, useState } from "react";
import Follow from "./Follow";

import axios from "axios";

const AllUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v2/user/bulk?filter=${filter}`
        );
        setUsers(response.data.users); // Assuming the data key is 'users'
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center space-x-4">
        <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center items-center">
          {user.firstName[0]}
        </div>
        <div>
          <p className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-600">{user.username}</p>
        </div>
        <Follow otherUserId={user._id} />
      </div>
    </div>
  );
}

export default AllUserDetails;
