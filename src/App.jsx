import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import usePortfolio from "./hooks/usePortfolio";
import useAdminAuth from "./hooks/useAdminAuth";

import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import ScrollProgress from "./components/ScrollProgress";

import {
  Home,
  SkillsPreview,
  ProjectsPreview,
  ServicesPreview,
  ProjectLinks,
} from "./pages/Home";

import { About } from "./pages/About";

import {
  Projects,
  ProjectDetail,
} from "./pages/Projects";

import {
  Services,
  Pricing,
} from "./pages/Services";

import { Contact } from "./pages/Contact";

import NotFound from "./pages/NotFound";

import {
  AdminLogin,
  AdminDashboard,
  AdminProjects,
  AdminServices,
  AdminSkills,
  AdminMedia,
  AdminSettings,
  AdminAudit,
} from "./admin/pages";

import { AdminLayout } from "./admin/layouts";

function PublicHome({
  profile,
  projects,
  skills,
  services,
}) {
  return (
    <>
      <Home profile={profile} />

      <SkillsPreview
        skills={skills}
      />

      <ProjectsPreview
        projects={projects}
      />

      <ServicesPreview
        services={services}
      />

      <ProjectLinks
        projects={projects}
      />

      <Pricing
        services={services}
      />
    </>
  );
}

function AdminArea({
  user,
  onLogout,
}) {
  return (
    <AdminLayout
      user={user}
      onLogout={onLogout}
    />
  );
}

export default function App() {
  const portfolio = usePortfolio();

  const {
    user,
    loading: authLoading,
    isAuthenticated,
    login,
    logout,
  } = useAdminAuth();

  if (
    portfolio.loading ||
    authLoading
  ) {
    return <LoadingScreen />;
  }

  if (
    portfolio.error &&
    !portfolio.profile &&
    portfolio.projects.length === 0 &&
    portfolio.skills.length === 0 &&
    portfolio.services.length === 0
  ) {
    return (
      <ErrorScreen
        message={portfolio.error}
        onRetry={portfolio.reload}
      />
    );
  }

  return (
    <>
      <ScrollProgress />

      <Routes>
        {/* ==================================================
            ESPACE PUBLIC
           ================================================== */}

        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <PublicHome
                profile={portfolio.profile}
                projects={portfolio.projects}
                skills={portfolio.skills}
                services={portfolio.services}
              />
            }
          />

          <Route
            path="/about"
            element={
              <About
                profile={portfolio.profile}
                skills={portfolio.skills}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <Projects
                projects={portfolio.projects}
              />
            }
          />

          <Route
            path="/projects/:slug"
            element={
              <ProjectDetail
                projects={portfolio.projects}
              />
            }
          />

          <Route
            path="/services"
            element={
              <Services
                services={portfolio.services}
              />
            }
          />

          <Route
            path="/contact"
            element={
              <Contact
                profile={portfolio.profile}
              />
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>

        {/* ==================================================
            CONNEXION ADMIN
           ================================================== */}

        <Route
          path="/admin/login"
          element={
            isAuthenticated ? (
              <Navigate
                to="/admin"
                replace
              />
            ) : (
              <AdminLogin
                onLogin={login}
              />
            )
          }
        />

        {/* ==================================================
            ADMINISTRATION PROTÉGÉE
           ================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={
                isAuthenticated
              }
              user={user}
            >
              <AdminArea
                user={user}
                onLogout={logout}
              />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <AdminDashboard
                user={user}
                projects={
                  portfolio.projects
                }
                skills={
                  portfolio.skills
                }
                services={
                  portfolio.services
                }
              />
            }
          />

          <Route
            path="projects"
            element={
              <AdminProjects />
            }
          />

          <Route
            path="services"
            element={
              <AdminServices />
            }
          />

          <Route
            path="skills"
            element={
              <AdminSkills />
            }
          />

          <Route
            path="media"
            element={
              <AdminMedia />
            }
          />

          <Route
            path="settings"
            element={
              <AdminSettings />
            }
          />

          <Route
            path="audit"
            element={
              <AdminAudit />
            }
          />
        </Route>
      </Routes>
    </>
  );
}
