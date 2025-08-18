import "./home.css";
import { useView } from "../context/useView";
import { useChat } from "../context/useChat";
import { useEffect, useState } from "react";

const Home = () => {
  const { userName, role } = useView();
  const { users } = useChat();
  const [filteredUsers, setFilteredUsers] = useState([]);
useEffect(() => {
    const updated = users
  .filter(user => user.userName !== userName)
  .sort((a, b) => {
    if (a.status === "Online" && b.status !== "Online") return -1;
    if (b.status === "Online" && a.status !== "Online") return 1;
    return (b.lastActiveTime || 0) - (a.lastActiveTime || 0);
  });

  setFilteredUsers(updated);
}, [users, userName]);


  const pendingVerification = [
    { companyName: "Google", createdBy: "Vishnu", createdAt: "10 minutes ago" },
    {
      companyName: "Microsoft",
      createdBy: "Anita",
      createdAt: "5 minutes ago",
    },
    { companyName: "Amazon", createdBy: "Rahul", createdAt: "20 minutes ago" },
    { companyName: "Apple", createdBy: "Priya", createdAt: "30 minutes ago" },
    { companyName: "Tesla", createdBy: "Arjun", createdAt: "1 hour ago" },
  ];

  const urgentVerification = [
    { companyName: "Adobe", createdBy: "Kiran", createdAt: "15 minutes ago" },
    { companyName: "Spotify", createdBy: "Leena", createdAt: "25 minutes ago" },
    { companyName: "Airbnb", createdBy: "Manish", createdAt: "40 minutes ago" },
    { companyName: "Slack", createdBy: "Neha", createdAt: "2 hours ago" },
    { companyName: "Dropbox", createdBy: "Amit", createdAt: "3 hours ago" },
    { companyName: "GitHub", createdBy: "Suresh", createdAt: "yesterday" },
    { companyName: "Zoom", createdBy: "Ravi", createdAt: "2 days ago" },
  ];

  const verifiedBroadcasts = [
    { companyName: "Twitter", createdBy: "Shreya", createdAt: "5 minutes ago" },
    {
      companyName: "PayPal",
      createdBy: "Santosh",
      createdAt: "12 minutes ago",
    },
    { companyName: "Uber", createdBy: "Mohit", createdAt: "1 hour ago" },
    { companyName: "Intel", createdBy: "Nikita", createdAt: "2 hours ago" },
    { companyName: "Samsung", createdBy: "Varun", createdAt: "yesterday" },
    { companyName: "Oracle", createdBy: "Deepa", createdAt: "2 days ago" },
    { companyName: "Cisco", createdBy: "Arvind", createdAt: "last week" },
  ];

  return (
    <div className="home-container">
      <div className="home-heading-container">
        <div className="home-text">
          <div className="home-name">
            Hello {userName}!
            <div className="home-profile-container">
              <div className="home-profile"></div>
            </div>
          </div>
          <span className="home-label">Broadcast Verification Dashboard</span>
        </div>
      </div>
      <div className="online-profiles-container">
        <div className="op-heading">Profiles</div>
        <div className="op-profiles">
          {filteredUsers.map((user, index) => (
            <div className="op-profile" key={index}>
              <div
                className={`${
                  user.status === "Online"
                    ? "op-profiles-logo"
                    : "ofp-profiles-logo"
                }`}
              ></div>
              <div className="op-profiles-name">{user.userName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="urgent-verifications-container">
        <div className="uv-heading">Urgent Verifications</div>
        <div className="uv-broadcasts">
          {urgentVerification.map((value, index) => (
            <div className="uv-broadcast" key={index}>
              <div className="uv-details">
                <div className="uv-company-name">{value.companyName}</div>
                <div className="uv-created-by">{value.createdBy}</div>
                <div className="uv-created-at">{value.createdAt}</div>
              </div>
              <div className="uv-labels">
                <div className="uv-label">Open</div>
                <div className="uv-button">Verify</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pending-verifications-container">
        <div className="pv-heading">Pending Verifications</div>
        <div className="pv-broadcasts">
          {pendingVerification.map((value, index) => (
            <div className="pv-broadcast" key={index}>
              <div className="pv-details">
                <div className="pv-company-name">{value.companyName}</div>
                <div className="pv-created-by">{value.createdBy}</div>
                <div className="pv-created-at">{value.createdAt}</div>
              </div>
              <div className="pv-labels">
                <div className="pv-label">Open</div>
                <div className="pv-button">Verify</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="verified-broad-container">
        <div className="v-heading">Latest Verified Broadcasts</div>
        <div className="v-broadcasts">
          {verifiedBroadcasts.map((value, index) => (
            <div className="v-broadcast" key={index}>
              <div className="v-details">
                <div className="v-company-name">{value.companyName}</div>
                <div className="v-created-by">{value.createdBy}</div>
                <div className="v-created-at">{value.createdAt}</div>
              </div>
              <div className="v-labels">
                <div className="v-label">Open</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="offline-profiles-container">
        <div className="ofp-heading">Offline Profiles</div>
        <div className="ofp-profiles">
          <div className="ofp-profile">
            <div className="ofp-profiles-logo"></div>
            <div className="ofp-profiles-name">Name</div>
          </div>
          <div className="ofp-profile">
            <div className="ofp-profiles-logo"></div>
            <div className="ofp-profiles-name">Name</div>
          </div>
          <div className="ofp-profile">
            <div className="ofp-profiles-logo"></div>
            <div className="ofp-profiles-name">Name</div>
          </div>
          <div className="ofp-profile">
            <div className="ofp-profiles-logo"></div>
            <div className="ofp-profiles-name">Name</div>
          </div>
          <div className="ofp-profile">
            <div className="ofp-profiles-logo"></div>
            <div className="ofp-profiles-name">Name</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
