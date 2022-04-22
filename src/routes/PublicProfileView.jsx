import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  existsUsername,
  getUserPublicProfileInfo,
  getProfilePhotoUrl,
} from "../firebase/firebase";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(1);
    getProfile();
    async function getProfile() {
      try {
        const userUid = await existsUsername(params.username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          const url = await getProfilePhotoUrl(userInfo.profile.profilePicture);
          setUrl(url);
          setState(5);
        } else {
          setState(7);
        }
      } catch (error) {}
    }
  }, [params]);

  if (state === 1) {
    return <div>Loading...</div>;
  }
  if (state === 7) {
    return <h1>{params.username} does not exist</h1>;
  }
  return (
    <div>
      <div>
        <div>
          <img src={url} alt="Profile" />
        </div>
        <h2>{profile?.profile.username}</h2>
        <h3>{profile?.profile.displayName}</h3>
        <div>
          {profile?.links.map((link) => (
            <div key={link.id}>
              <a href={link.url}>{link.title}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;
