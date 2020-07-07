import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandPage from "./pages/LandPage";
import AuthContextProvider from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layouts/MainLayout";
import NotificationPage from "./pages/NotificationPage";
import PostPage from "./pages/PostPage";
import OpenPostPage from "./pages/OpenPostPage";
import { Helmet } from "react-helmet";
import Messagepage from "./pages/MessagePage";
import ConversationPage from "./pages/ConversationPage";
import SchoolPage from "./pages/SchoolPage";
import SchoolsPages from "./pages/SchoolsPage";
import ShowTeacher from "./pages/TeachersPage/ShowTeacher";
import CreateQuestion from "./pages/QuestionPage/CreateQuestion";

function App() {
  return (
    <AuthContextProvider>
      <Helmet>
        <title> GenteUni</title>
        <meta name="description" content="Gente Uni" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/auth/*" element={<LandPage />} />
          <Route path="app" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/:id" element={<OpenPostPage />} />
            <Route path="/settings/*" element={<SettingPage />} />
            <Route path="/me/*" element={<ProfilePage />} />
            <Route path="/profile/:user/*" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/message" element={<Messagepage />} />
            <Route path="/school/:id/*" element={<SchoolPage />} />
            <Route path="/schools" element={<SchoolsPages />} />
            <Route path="/teachers/:id" element={<ShowTeacher />} />
            <Route path="/question/create/" element={<CreateQuestion />} />
          </Route>
          <Route path="/chat/:id" element={<ConversationPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
