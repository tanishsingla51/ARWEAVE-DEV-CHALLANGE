import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Update User
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Enter your credentials to update your account
          </p>
          <div className="mb-4">
            <input
              type="password"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={async () => {
                await axios.put(
                  "http://localhost:4000/api/v2/user/update",
                  {
                    password: password || undefined,
                    firstName: firstName || undefined,
                    lastName: lastName || undefined,
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
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
