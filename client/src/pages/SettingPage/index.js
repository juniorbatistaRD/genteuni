import React from "react";
import styles from "./index.module.css";
import { Routes, Route } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import ProfileSetting from "./ProfileSettings";
import PictureSetting from "./PictureSettings";
import PasswordSettings from "./PasswordSettings";
import FacebookSettings from "./FacebookSettings";
import SchoolSettings from "./SchoolSettings";
import AddSchool from "./AddSchool";
import CoverSettings from "./CoverSettings";
import useScrollToTop from "../../hooks/useScrollToTop";
import NotificationSettings from "./NotificationSettings";

function SettingPage() {
  useScrollToTop();

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<SettingsMenu />} />
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/picture" element={<PictureSetting />} />
        <Route path="/password" element={<PasswordSettings />} />
        <Route path="/facebook" element={<FacebookSettings />} />
        <Route path="/school" element={<SchoolSettings />} />
        <Route
          path="/school/search/:searchQuery"
          element={<SchoolSettings />}
        />
        <Route path="/school/add" element={<AddSchool />} />
        <Route path="/cover" element={<CoverSettings />} />
        <Route path="/notification" element={<NotificationSettings />} />
      </Routes>
    </div>
  );
}

export default SettingPage;
