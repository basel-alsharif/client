import { createBrowserRouter } from 'react-router-dom';
import {
  LandingPage, Login, Signup, Therapists, TherapistPage, LoginAdmin, NotFound,
  BugReportPage, AdminTherapists, AdminBugs,
} from '../pages';
import Layout from '../layout/Layout';
import { ProtectedAdmin, ProtectedUser } from './protected';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'therapists',
        element: <Therapists />,
      },
      {
        path: 'therapist/:id',
        element: <TherapistPage />,
      },
      {
        path: 'bug-report',
        element: <BugReportPage />,
      },
    ],
  },
  {
    path: 'signup',
    element: <ProtectedUser><Signup /></ProtectedUser>,
  },
  {
    path: 'login',
    element: <ProtectedUser><Login /></ProtectedUser>,
  },
  {
    path: 'admin/login',
    element: <LoginAdmin />,
  },
  {
    path: 'admin/therapists',
    element: <ProtectedAdmin />,
    children: [
      {
        path: '',
        element: <AdminTherapists />,
      },
      {
        path: 'bugs',
        element: <AdminBugs />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
