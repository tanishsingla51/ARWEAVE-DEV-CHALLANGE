import UserPost from "./UserPost";
import AllPost from "./AllPost";

import UserDetails from "./UserDetails";

const DashBoard = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-300">
      <h1 className="text-5xl text-center font-semibold text-gray-800 my-8">
        STUNECKT
      </h1>

      <div className="w-full max-w-2xl px-4">
        <UserDetails />

        <div className="mb-8">
          <UserPost />
        </div>

        <AllPost />
      </div>
    </div>
  );
};

export default DashBoard;
