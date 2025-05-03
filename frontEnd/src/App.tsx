import {
  BrowserRouter,
  // HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";
import "./App.css";
import Homepage from "./pages/Home&SavedPage/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./pages/AppLayout";
import TranslationPage from "./pages/TranslationPage/TranslationPage";
import GamesAreaPage from "./pages/GamesAreaPage";
import SavedPage from "./pages/Home&SavedPage/SavedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.css";
import { TranslationPageProvider } from "./contexts/TranslationProvider";
import WordPage from "./pages/WordPage/WordPage";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthenticationProvider from "./contexts/AuthProvider";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import VerifyUrEmail from "./pages/VerifyUrEmail";
import EmailVerified from "./pages/EmailVerified";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ThemeProvider>
          <TranslationPageProvider>
            <Routes>
              <Route path="emailVerified" element={<EmailVerified />} />
              <Route path="verifyYourEmail" element={<VerifyUrEmail />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="auth/callback" element={<AuthCallbackPage />} />
              <Route index element={<Navigate replace to="login" />} />

              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="homepage" />} />

                <Route path="homepage" element={<Homepage />} />
                <Route path="saved" element={<SavedPage />} />
                <Route path="translation" element={<TranslationPage />} />
                <Route path="word" element={<WordPage />} />
                <Route path="gamesArea" element={<GamesAreaPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </TranslationPageProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
