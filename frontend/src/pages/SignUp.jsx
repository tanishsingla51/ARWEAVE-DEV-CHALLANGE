import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-white mb-4">Sign up</h1>
          <p className="text-sm text-gray-400 mb-4">
            Enter your information to create an account
          </p>
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
            <input
              type="email"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="harkirat@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            <button
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:4000/api/v2/user/signup",
                  {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            >
              Sign up
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-2">Already have an account?</p>
          <a href="/" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
