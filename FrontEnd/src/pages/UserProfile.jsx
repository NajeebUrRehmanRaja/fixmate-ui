import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Najeeb ur Rehman Raja",
    email: "najeeb@ai.com",
    avatar:
      "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740",
    bio: "Full-stack developer passionate about AI-powered code review systems.",
    totalCodesSubmitted: 2,
    reviews: [
      { id: 1, title: "Bug Detection in Login.js", date: "2025-08-05" },
      { id: 2, title: "Performance Issue in App.jsx", date: "2025-07-28" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user.name,
    bio: user.bio,
  });

  const handleSave = () => {
    setUser({ ...user, name: editedData.name, bio: editedData.bio });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl pt-20 mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-black shadow-lg rounded-2xl p-6 flex flex-col items-center">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-gray-200 shadow"
        />
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2 text-center text-gray-700 italic">{user.bio}</p>

        {/* Stats */}
        <div className="mt-4 bg-gray-600 w-full p-3 rounded-lg text-center">
          <p className="text-lg font-semibold">
            Total Codes Submitted:{" "}
            <span className="text-green-500">{user.totalCodesSubmitted}</span>
          </p>
        </div>
        <div className="bg-gray-800 w-full shadow-md rounded-2xl mt-6 p-5">
          <h3 className="text-xl font-bold mb-3">Recent Code Reviews</h3>
          {user.reviews.length > 0 ? (
            <ul className="space-y-2">
              {user.reviews.map((review) => (
                <li
                  key={review.id}
                  className="p-3 border rounded-lg hover:bg-gray-900 transition"
                >
                  <p className="font-medium">{review.title}</p>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3"
            />

            <label className="block mb-2 font-semibold">Bio</label>
            <textarea
              value={editedData.bio}
              onChange={(e) =>
                setEditedData({ ...editedData, bio: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
