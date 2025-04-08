import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Inbox as InboxIcon,
} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../../../assets/img/logo.png';

const DashBoard = () => {
  const navigate = useNavigate();

  const handleToPageHome = () => {
    navigate('/');
  };
  const handleToPageTherapists = () => {
    navigate('/admin/therapists');
  };
  const handleToPageBugs = () => {
    navigate('/admin/therapists/bugs');
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: '175px' }}>
      <div style={{ width: '175px' }}>

      <Link to="/">
        <img src={Logo} alt="logo" style={{ width: '100%' }} />
      </Link>
      <List style={{ width: '100%' }}>
        <ListItem button onClick={handleToPageHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleToPageTherapists}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Therapists" />
        </ListItem>
        <ListItem button onClick={handleToPageBugs}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Bugs" />
        </ListItem>
      </List>
      </div>
    </Drawer>
  );
};

export default DashBoard;
