import axios from 'axios';

const FETCH_DATA_URL = `https://demo7242716.mockable.io/products`;

const _fetchData = () => {

	return axios.get(FETCH_DATA_URL);
}

export const fetchData = () => {

	return {
		type: 'FETCH_DATA',
		payload: _fetchData()
	}
}