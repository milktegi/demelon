import { SET_CURRENT_USERS } from '../actions/types';
import isEmpty from '../validation/is-empty';
import axios from 'axios';

const initialState = {
	isAutenthicated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_CURRENT_USER:
		return {
			...state,
			isAuthenticated: !isEmpty(action.payload),
			user: action.payload
		}
		default: 
		return state;
	}
}
