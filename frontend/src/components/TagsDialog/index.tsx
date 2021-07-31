import React from 'react';
import clsx from 'clsx';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import { useStyles } from './styles';

interface Iprops{
    toggleOpen: () => void,
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    open: boolean,
    action: () => void,
    actionTitle: string
}

const TagsDialog = ({ toggleOpen, tags, setTags, open, action, actionTitle }: Iprops) => {

    const classes = useStyles();

    const changeTags = (val: string) => {
        if(!tags.includes(val)) {
            setTags([ ...tags, val ]);
        }
        else {
            setTags(tags.filter(tag => tag!==val));
        }
    }

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
                    <Button variant="contained" color="primary" size="large" onClick={action}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            { actionTitle }
                        </Typography>
                    </Button>
                    <Button color="primary" size="large" onClick={() => setTags([])}>
                        <Typography variant="subtitle1" className={classes.buttonText}>
                            Cancel
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TagsDialog;
