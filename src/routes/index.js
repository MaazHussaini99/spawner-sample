import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';

// Lazy loaded components
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/auth-forms/Login')));
const CreatePassword = Loadable(lazy(() => import('views/pages/authentication/auth-forms/CreatePassword')));
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')));
const Registration = Loadable(lazy(() => import('views/registration')));
const Users = Loadable(lazy(() => import('views/users')));
const Standard = Loadable(lazy(() => import('views/drf/standard')));
const StandardEdit = Loadable(lazy(() => import('views/drf/standard/edit')));
const Checked = Loadable(lazy(() => import('views/drf/review/checked')));
const Approved = Loadable(lazy(() => import('views/drf/review/approved')));
const New = Loadable(lazy(() => import('views/drf/oa/new')));
const OAApprovedScreen = Loadable(lazy(() => import('views/drf/oa/approved')));
const EditOA = Loadable(lazy(() => import('views/drf/oa/edit')));
const NewDesign = Loadable(lazy(() => import('views/drf/newdesign/new')));
const NewDesignEdit = Loadable(lazy(() => import('views/drf/newdesign/edit')));
const Logout = Loadable(lazy(() => import('views/pages/authentication/auth-forms/Logout')));
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

export default function ThemeRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/create-password',
      element: <CreatePassword />
    },
    {
      path: '/logout',
      element: <Logout />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'register', element: <Registration /> },
        { path: 'users', element: <Users /> },
        { path: 'design/drf/standard', element: <Standard /> },
        { path: 'design/drf/edit', element: <StandardEdit /> },
        { path: 'design/drf/review/checked', element: <Checked /> },
        { path: 'design/drf/review/approved', element: <Approved /> },
        { path: 'design/oa/new', element: <New /> },
        { path: 'design/oa/review/approved', element: <OAApprovedScreen /> },
        { path: 'design/oa/edit', element: <EditOA /> },
        { path: 'design/drf/new_design/new', element: <NewDesign /> },
        { path: 'design/drf/new_design/edit', element: <NewDesignEdit /> }
      ]
    }
  ]);

  return routes;
}
