import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Create Post"} />
          <SubHeading label={"Create a post with a title and a description"} />
          <InputBox
            Change={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title"
            label={"Title"}
          />
          <InputBox
            Change={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="description"
            label={"Description"}
          />
          <div className="pt-4">
            <Button
              Click={async () => {
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
              label={"Create Post"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
