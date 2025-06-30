import {
  BrowserRouter,
  // HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";
import "./App.css";
import "./App.css";
import { TranslationPageProvider } from "./contexts/TranslationPageProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthenticationProvider from "./contexts/AuthProvider";
import { lazy, Suspense } from "react";
import SpinnerPage from "./components/SpinnerPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FlashCardsGame from "./pages/GamesAreaPage/Flashcards/FlashCardsGame";
import QuizesGame from "./pages/GamesAreaPage/Quizes/QuizesGame";
import ChooseGame from "./pages/GamesAreaPage/ChooseGame";

const Homepage = lazy(() => import("./pages/Home&SavedPage/Homepage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const TranslationPage = lazy(
  () => import("./pages/TranslationPage/TranslationPage")
);
const GamesAreaPage = lazy(() => import("./pages/GamesAreaPage/GamesAreaPage"));
const SavedPage = lazy(() => import("./pages/Home&SavedPage/SavedPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const WordPage = lazy(() => import("./pages/WordPage/WordPage"));
const AuthCallbackPage = lazy(() => import("./pages/Auth/AuthCallbackPage"));
const VerifyUrEmail = lazy(() => import("./pages/Auth/VerifyUrEmail"));
const EmailVerified = lazy(() => import("./pages/Auth/EmailVerified"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ThemeProvider>
          <TranslationPageProvider>
            <Suspense fallback={<SpinnerPage />}>
              <Routes>
                <Route path="emailVerified" element={<EmailVerified />} />
                <Route path="verifyYourEmail" element={<VerifyUrEmail />} />
                <Route
                  path="resetPassword/:token"
                  element={<ResetPasswordPage />}
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="auth/callback" element={<AuthCallbackPage />} />
                <Route index element={<Navigate replace to="login" />} />

                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="homepage" />} />
                  <Route path="homepage" element={<Homepage />} />
                  <Route path="saved" element={<SavedPage />} />
                  <Route path="translation" element={<TranslationPage />} />
                  <Route path="word/:id" element={<WordPage />} />
                  <Route path="gamesArea" element={<GamesAreaPage />}>
                    <Route index element={<ChooseGame />} />
                    <Route path="flashcards" element={<FlashCardsGame />} />
                    <Route path="quiz" element={<QuizesGame />} />
                  </Route>
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </Suspense>
          </TranslationPageProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
