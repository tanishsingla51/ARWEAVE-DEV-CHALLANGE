import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Update User"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            Change={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <InputBox
            Change={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            Change={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <div className="pt-4">
            <Button
              Click={async () => {
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
              label={"Update Details"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
