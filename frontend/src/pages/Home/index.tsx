import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Code as CodeIcon, Computer as ComputerIcon, PersonOutline as PersonOutlineIcon, ExitToApp as ExitToAppIcon, FilterList as FilterListIcon } from '@material-ui/icons';

import Header from '../../components/Header';
import Search from '../../components/Search';
import AddIcon from '../../components/AddIcon';
import { useStyles } from './styles';

const Home = () => {

    const classes = useStyles();

    const history = useHistory();

    const handleLogout = () => {
        // logout logic
    }

    const searchByTags = () => {
        // search by tags logic
        toggleOpen();
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    const changeTags = (val: string) => {
        if(!tags.includes(val)) {
            setTags([ ...tags, val ]);
        }
        else {
            setTags(tags.filter(tag => tag!==val));
        }
        
    }

    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState([] as string[]);

    const elements = [
        {
            icon: <ExitToAppIcon/>,
            title: 'Logout',
            action: handleLogout
        },
        {
            icon: <PersonOutlineIcon/>,
            title: 'Dashboard',
            action: () => history.push('/profile')
        },
        {
            icon: <ComputerIcon/>,
            title: 'Interview',
            action: () => history.push('/interview_home')
        },
        {
            icon: <CodeIcon/>,
            title: 'IDE',
            action: () => history.push('/ide')
        },
        {
            icon: <FilterListIcon/>,
            title: 'Tags',
            action: () => setOpen(!open)
        }
    ]

    const Tags = [
		'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Depth-First Search', 'Sorting', 'Greedy', 'Breadth-First Search',
		'Tree', 'Database', 'Binary Tree', 'Binary Search', 'Two Pointers', 'Matrix', 'Bit Manipulation', 'Backtracking', 'Heap (Priority Queue)',
		'Design', 'Stack', 'Graph', 'Simulation', 'Sliding Window', 'Prefix Sum', 'Recursion', 'Counting', 'Union Find', 'Linked List', 'Binary Search Tree',
		'Trie', 'Monotonic Stack', 'Bitmask', 'Queue', 'Ordered Set', 'Divide and Conquer', 'Memoization', 'Geometry', 'Game Theory', 'Segment Tree', 
		'Topological Sort', 'Interactive', 'Hash FUnction', 'String Matching', 'Enumeration', 'Data Stream', 'Rolling Hash', 'Randomised', 'Binary Indexed Tree',
		'Shortest Path', 'Combinatorics', 'Concurrency', 'Iterator', 'Probability and Statistics', 'BrainTeaser', 'Monotonic Queue', 'Number Theory', 
		'Doubly-Linked List', 'Merge Sort', 'Counting Sort', 'Minimum Spanning Tree', 'Bucket Sort', 'Quickselect', 'Shell', 'Suffix Array', 'Line Sweep',
		'Strongly Connected Component', 'Reservoir Sampling', 'Eulerian Circuit', 'Radix Sort', 'Rejection Sampling', 'Biconnected Conponent'
	];

    return (
        <div>
            <Header>
                <Search/>
            </Header>
            <div className={classes.toolbar}/>
            <AddIcon elements={elements}/>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if(!reason) {
                        toggleOpen();
                    }
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle className={classes.listItem}>
                    Filter by Tags
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {Tags.map((val) => (
                            <ListItem button onClick={() => changeTags(val)} key={val} className={clsx(classes.listItem, { [classes.listItemSelected]: tags.includes(val) })}>
                                <ListItemText>
                                    {val}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" size="large" onClick={searchByTags}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            Search
                        </Typography>
                    </Button>
                    <Button color="primary" size="large" onClick={toggleOpen}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            Cancel
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Home;
