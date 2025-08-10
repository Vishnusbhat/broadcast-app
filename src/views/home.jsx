import "./home.css";
import { useView } from "../context/useView";

const Home = () => {
  const { user, role } = useView();
  return (
    <div className="home-container">
      <div className="home-heading-container">
        <div className="home-text">
          <div className="home-name">
            Good Morning, Vishnu!
            <div className="home-profile-container">
              <div className="home-profile"></div>
            </div>
          </div>
          <span className="home-label">Broadcast Verification Dashboard</span>
        </div>
      </div>
      <div className="online-profiles-container">
        <div className="op-heading">Online Profiles</div>
        <div className="op-profiles">
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
          <div className="op-profile">
            <div className="op-profiles-logo"></div>
            <div className="op-profiles-name">Name</div>
          </div>
        </div>
      </div>
      <div className="urgent-verifications-container">
        <div className="uv-heading">Urgent Verifications</div>
        <div className="uv-broadcasts">
          <div className="uv-broadcast"></div>
          <div className="uv-broadcast"></div>
        </div>
      </div>
      <div className="pending-verifications-container">
        <div className="pv-heading">Pending Verifications</div>
        <div className="pv-broadcasts">
          <div className="pv-broadcast"></div>
          <div className="pv-broadcast"></div>
        </div>
      </div>
      <div className="verified-broad-container">
        <div className="v-heading">Latest Verified Broadcasts</div>
        <div className="v-broadcasts">
          <div className="v-broadcast"></div>
          <div className="v-broadcast"></div>
        </div>
      </div>
      <div className="offline-profiles-container">
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
      </div>
    </div>
  );
};

export default Home;
