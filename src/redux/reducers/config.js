import { combineReducers } from 'redux';
import { PENDING, FAILED, DEFAULT, SUCCESS } from '../../helpers/constants';
import { FETCH_DATA_PENDING, FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED}
	from '../action-types/config';


const initialMetaState = {
	FETCH_DATA_STATUS: DEFAULT 
}


const initialDataState = {
	apiData: {}
}

function metaReducer(state = initialMetaState, action) {

	switch (action.type) {
		case FETCH_DATA_PENDING:
			return { initialMetaState, FETCH_DATA_STATUS: PENDING };
		case FETCH_DATA_FULFILLED:
			return { initialMetaState, FETCH_DATA_STATUS: SUCCESS };
		case FETCH_DATA_REJECTED:
			return { initialMetaState, FETCH_DATA_STATUS: FAILED };
		default:
			return state;
	}
}


function dataReducer(state = initialDataState, action) {

	switch (action.type) {
		case FETCH_DATA_FULFILLED:
			return { ...state, apiData: action.payload.data };
		default:
			return state;
	}
}



export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});