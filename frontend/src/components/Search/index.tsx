import React from 'react'
import { InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import { useAppDispatch } from '../../Hooks/reduxHooks';
import { getQuestionForHome, fetchQuestions } from '../../actions/question';
import { useStyles } from './styles';

interface Iprops{
	setChange: React.Dispatch<React.SetStateAction<any[]>>
}

const Search = ({ setChange }: Iprops) => {

    const classes = useStyles();

	const dispatch = useAppDispatch();

	const handleChange = (e: any) => {
		if(e.target.value === '') {
			try{
				dispatch(fetchQuestions())
				.then(() => {
					setChange(JSON.parse(localStorage.getItem('questions') as string));
					localStorage.removeItem('questions');
				});
			} catch(error){
				console.log(error);
			}
		} else {
			try{
				dispatch(getQuestionForHome({ QuestionID: e.target.value }))
				.then(() => {
					setChange(JSON.parse(localStorage.getItem('questions') as string));
					localStorage.removeItem('questions');
				});
			} catch(error){
				console.log(error);
			}
		}
	}
    
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
            	<SearchIcon />
            </div>
            <InputBase
				placeholder="Search…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
				onChange={handleChange}
            />
        </div>
    )
}

export default Search
