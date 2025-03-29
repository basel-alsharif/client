import { Outlet } from 'react-router-dom';
import Dashboard from '../components/dashboard/dashBoard';

const LayoutAdmin = () => (
  <div style={{ display: 'flex' }}>
    <Dashboard />
    <div style={{ flexGrow: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default LayoutAdmin;
