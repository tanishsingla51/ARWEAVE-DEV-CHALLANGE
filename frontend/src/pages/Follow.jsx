import { useState } from "react";
import axios from "axios";

const Follow = ({ otherUserId, onFollow }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://stuneckt-backend-assignment.vercel.app/api/v2/user/follow",
        { otherUserId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // If follow was successful, trigger the onFollow callback
      if (response.status === 200) {
        onFollow();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`btn ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Following..." : "Follow"}
    </button>
  );
};

export default Follow;
