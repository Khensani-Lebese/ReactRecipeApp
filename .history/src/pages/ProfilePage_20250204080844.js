import React, { useState, useEffect } from "react";
import { fetchUsers, updateUser } from "../services/api";
import defaultProfilePic from "../assets/Image/pp_icon.jpg";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const ProfilePic = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #ff7e5f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: 0.3s;

  &:hover {
    background: #e06c50;
  }
`;

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const result = await fetchUsers();
          const currentUser = result.data.find((u) => u.id === user.id);
          if (currentUser) {
            setProfile(currentUser);
            setName(currentUser.name);
            setSurname(currentUser.surname);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
            setProfilePicture(currentUser.profilePicture || defaultProfilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!profile) {
      setError("Profile not found.");
      return;
    }
    try {
      const updatedProfile = { name, surname, email, phone, profilePicture };
      await updateUser(profile.id, updatedProfile);
      localStorage.setItem("user", JSON.stringify(updatedProfile));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfilePic
          src={profilePicture}
          alt="User"
          onError={(e) => (e.target.src = defaultProfilePic)}
        />
        <input type="file" onChange={handleProfilePictureChange} />

        <form onSubmit={handleSaveProfile}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
          />
          <Input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Last Name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <Button type="submit">Save All</Button>
        </form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
