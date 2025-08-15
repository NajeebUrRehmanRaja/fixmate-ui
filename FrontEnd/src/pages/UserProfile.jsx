import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Avatar from "react-avatar";
import LogoutButton from "../components/LogoutButton";
import {
  FiSettings,
  FiCode,
  FiActivity,
  FiUser,
  FiRefreshCw,
} from "react-icons/fi";
import axios from "axios";
import { format, differenceInDays } from "date-fns";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editedData, setEditedData] = useState({
    name: user.name || "",
    bio: user.bio || "Code enthusiast using AI-powered bug detection!",
    email: user.email || "",
  });

  // Code stats state
  const [codeStats, setCodeStats] = useState({
    totalSubmitted: 0,
    last30Days: 0,
    languages: {},
    loading: false,
    error: null,
    lastUpdated: null,
  });

  // Recent activity state
  const [recentActivity, setRecentActivity] = useState({
    items: [],
    loading: false,
    error: null,
    lastUpdated: null,
  });

  // Mock API fetch function for code stats
  const fetchCodeStats = async () => {
    setCodeStats((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data } = await axios.get("/api/code/code-stats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCodeStats({
        totalSubmitted: data.total_submissions,
        last30Days: data.last_30_days,
        languages: data.language_distribution,
        loading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setCodeStats((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.msg || "Failed to load stats",
      }));
    }
  };

  const fetchRecentActivity = async () => {
    setRecentActivity((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data } = await axios.get("/api/code/recent-activity", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRecentActivity({
        items: data.activities,
        loading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setRecentActivity((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.msg || "Failed to load activity",
      }));
    }
  };


  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === "stats") {
      fetchCodeStats();
    } else if (activeTab === "activity") {
      fetchRecentActivity();
    }
  }, [activeTab]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your API
    // Example: updateUserProfile(editedData);
  };

  const handleRefresh = () => {
    if (activeTab === "stats") {
      fetchCodeStats();
    } else if (activeTab === "activity") {
      fetchRecentActivity();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateStreak = (lastActive) => {
    if (!lastActive) return 0;

    // Calculate days between last active date and today
    const daysDifference = differenceInDays(new Date(), new Date(lastActive));

    // If last active was today, add to streak, else reset to 1
    return daysDifference === 0 ? 1 : 0;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-6">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow"
                />
              ) : (
                <Avatar
                  name={user.name || user.email}
                  email={user.email}
                  size="100"
                  round={true}
                  className=""
                />
              )}
              <h2 className="text-2xl font-bold mt-4">
                {user.name || user.email.split("@")[0]}
              </h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="mt-2 text-center text-gray-300 italic">
                {editedData.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">
                  Member Since
                </h3>
                <p className="text-indigo-400">
                  {format(new Date(user.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">
                  Last Active
                </h3>
                <p className="text-indigo-400">
                  {format(new Date(user.lastActive), "MMMM dd, yyyy hh:mm a")}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        );

      case "stats":
        return (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-300">
                Code Statistics
              </h2>
              <button
                onClick={handleRefresh}
                disabled={codeStats.loading}
                className="flex items-center text-gray-400 hover:text-indigo-400 transition"
              >
                <FiRefreshCw
                  className={`mr-2 ${codeStats.loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>

            {codeStats.error ? (
              <div className="bg-red-900/20 p-4 rounded-lg text-red-400">
                {codeStats.error}
                <button
                  onClick={fetchCodeStats}
                  className="ml-4 text-indigo-400 hover:text-indigo-300"
                >
                  Retry
                </button>
              </div>
            ) : codeStats.loading && !codeStats.lastUpdated ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-gray-500">
                  Loading statistics...
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Total Submissions
                    </h3>
                    <p className="text-3xl font-bold text-indigo-400">
                      {codeStats.totalSubmitted}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Last 30 Days
                    </h3>
                    <p className="text-3xl font-bold text-indigo-400">
                      {codeStats.last30Days}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Active Streak
                    </h3>
                    <p className="text-3xl font-bold text-indigo-400">
                      {calculateStreak()} days
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Language Distribution
                    </h3>
                    {codeStats.lastUpdated && (
                      <span className="text-xs text-gray-500">
                        Updated {formatDate(codeStats.lastUpdated)}
                      </span>
                    )}
                  </div>
                  {codeStats &&
                  codeStats.languages &&
                  Object.keys(codeStats.languages).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(codeStats.languages).map(
                        ([lang, count]) => (
                          <div key={lang} className="flex items-center">
                            <span className="w-24 text-gray-300">{lang}</span>
                            <div className="flex-1 bg-gray-600 rounded-full h-4">
                              <div
                                className="bg-indigo-500 h-4 rounded-full"
                                style={{
                                  width: `${
                                    (count / codeStats.totalSubmitted) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-gray-300">{count}</span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400">No language data available</p>
                  )}
                </div>
              </>
            )}
          </div>
        );

      case "activity":
        return (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-300">
                Recent Activity
              </h2>
              <button
                onClick={handleRefresh}
                disabled={recentActivity.loading}
                className="flex items-center text-gray-400 hover:text-indigo-400 transition"
              >
                <FiRefreshCw
                  className={`mr-2 ${
                    recentActivity.loading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            </div>

            {recentActivity.error ? (
              <div className="bg-red-900/20 p-4 rounded-lg text-red-400">
                {recentActivity.error}
                <button
                  onClick={fetchRecentActivity}
                  className="ml-4 text-indigo-400 hover:text-indigo-300"
                >
                  Retry
                </button>
              </div>
            ) : recentActivity.loading && !recentActivity.lastUpdated ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-gray-500">
                  Loading activity...
                </div>
              </div>
            ) : recentActivity &&
              Array.isArray(recentActivity.items) &&
              recentActivity.items.length > 0 ? (
              <>
                {recentActivity.lastUpdated && (
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      Updated {formatDate(recentActivity.lastUpdated)}
                    </span>
                  </div>
                )}
                <div className="space-y-4">
                  {recentActivity.items.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-200">
                          {activity.title}
                        </p>
                        <span className="text-sm text-gray-400">
                          {formatDate(activity.timestamp)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="px-2 py-1 bg-indigo-900 text-indigo-200 text-xs rounded-full">
                          {activity.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-700 p-8 rounded-lg text-center">
                <p className="text-gray-400">No recent activity found</p>
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-300">
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-300 mb-2">
                  Change Password
                </h4>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">
                  Request Password Change
                </button>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-300 mb-2">
                  Notification Preferences
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                      defaultChecked
                    />
                    <span className="text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600"
                      defaultChecked
                    />
                    <span className="text-gray-300">In-app notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-15">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 hidden md:block">
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <Avatar
            name={user.name || user.email}
            email={user.email}
            size="80"
            round={true}
            className="mb-4"
          />
          <h2 className="text-xl font-bold">
            {user.name || user.email.split("@")[0]}
          </h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-indigo-900 text-indigo-100"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiUser className="mr-3" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
              activeTab === "stats"
                ? "bg-indigo-900 text-indigo-100"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiActivity className="mr-3" />
            Code Statistics
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
              activeTab === "activity"
                ? "bg-indigo-900 text-indigo-100"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiCode className="mr-3" />
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
              activeTab === "settings"
                ? "bg-indigo-900 text-indigo-100"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <FiSettings className="mr-3" />
            Settings
          </button>
          <LogoutButton />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setActiveTab("profile")}
            className="p-2 rounded-full bg-gray-700"
          >
            <FiUser />
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">{renderTabContent()}</div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-300">
              Edit Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Bio
                </label>
                <textarea
                  value={editedData.bio}
                  onChange={(e) =>
                    setEditedData({ ...editedData, bio: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white"
                  rows="4"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
