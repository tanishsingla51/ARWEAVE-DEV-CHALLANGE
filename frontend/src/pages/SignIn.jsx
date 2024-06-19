import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";

const Signin = () => {
  const { connected } = useConnection();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-white mb-4">
            WELCOME TO ARWEAVE
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Enter your credentials to access your account
          </p>
          <div className="mb-4">
            <input
              type="email"
              className="w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="abc@gmail.com"
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
                  "https://stuneckt-backend-assignment.vercel.app/api/v2/user/signin",
                  {
                    username: username,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            >
              Sign in
            </button>
          </div>
          {/* <p className="text-sm text-gray-400 mb-2">Do not have an account?</p> */}

          {connected ? (
            navigate("/dashboard")
          ) : (
            <div className="gap-10 p-9 my-18 flex flex-col justify-center items-center">
              <p>OR</p>
              <ConnectButton accent="rgb(30,129,176)" />
            </div>
          )}
          <div>
            <p>Demo Account : username = tanish@gmail.com </p>
            <p className="ml-[118px]">password = tanish</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
