import UserPost from "./UserPost";
import AllPost from "./AllPost";
import UserDetails from "./UserDetails";

const DashBoard = () => {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-12">
          <h1 className="text-5xl font-semibold text-gray-200 mb-8">
            STUNECKT
          </h1>
          <div className="w-full max-w-3xl">
            <div className="mb-8">
              <UserDetails />
            </div>
            <div className="mb-8">
              <UserPost />
            </div>
            <AllPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
