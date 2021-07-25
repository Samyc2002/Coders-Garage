import React, { MouseEventHandler, useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import { useStyles } from './styles';
import './styles.css';

interface Element{
    icon: React.ReactElement,
    title: string,
    action: MouseEventHandler<HTMLDivElement>
}

interface Iprops{
    elements: Element[]
}

const AddIcon = ({ elements }: Iprops) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {

        setOpen(!open);
    }
    
    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                open={open}
                onOpen={toggleOpen}
                onClose={toggleOpen}
                direction="up"
            >
                {elements.map((element, index) => (
                    <SpeedDialAction
                        key={index}
                        icon={element.icon}
                        tooltipTitle={element.title}
                        tooltipOpen
                        onClick={element.action}
                    />
                ))}
            </SpeedDial>
        </div>
    )
}

export default AddIcon;
