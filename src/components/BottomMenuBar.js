import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Tooltip, } from '@mui/material';
import { Home, People, Event, List, Person } from '@mui/icons-material';
import styles from '../styles';

function BottomMenuBar() {
    const [value, setValue] = useState('home');

    return (
        
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                sx={styles.bottomMenuBar}
            >
                <Tooltip title="Friends" placement="top">
                    <BottomNavigationAction 
                        label="Friends" 
                        value="friends" 
                        icon={<People />} 
                        sx={styles.menuItem} 
                    />
                </Tooltip>
                <Tooltip title="Events" placement="top">
                    <BottomNavigationAction 
                        label="Events" 
                        value="events" 
                        icon={<Event />} 
                        sx={styles.menuItem} 
                    />
                </Tooltip>
                <Tooltip title="Home" placement="top">
                    <BottomNavigationAction 
                        label="Home" 
                        value="home" 
                        icon={<Home />} 
                        sx={styles.menuItem} 
                    />
                </Tooltip>
                <Tooltip title="Tasks" placement="top">
                    <BottomNavigationAction 
                        label="Tasks" 
                        value="tasks" 
                        icon={<List />} 
                        sx={styles.menuItem} 
                    />
                </Tooltip>
                <Tooltip title="Profile" placement="top">
                    <BottomNavigationAction 
                        label="Profile" 
                        value="profile" 
                        icon={<Person />} 
                        sx={styles.menuItem} 
                    />
                </Tooltip>
            </BottomNavigation>
       
    );
}

export default BottomMenuBar;
