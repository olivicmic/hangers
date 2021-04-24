import { useCallback, useEffect, useState } from 'react';
import { api } from 'lal';

const { REACT_APP_API_MAIN_KEY: mainKey } = process.env;

export default function useAPI({ 
		apiKey, // if an alternative key from the env key is needed, state here
		filter = f => f, // pass a array filter function to the main collection
		itemNames, // name the main collection, otherwise it is 'items'
		noKey, // set to true to ommit key from request
		onSuccess = () => {}, // a function that will excute after a succesful fetch
		route, // url to be fetched
		queries, // an object consisting of strings to be encoded and appended to the url
		watch // pass an external value to watch for updates on to trigger a fetch
}) {
	const collection = itemNames ? itemNames : 'items';
	const [status, setStatus] = useState(0);
	const [error, setError] = useState(null);
	const [content, setContent] = useState({ [collection]: [] });

	const fetch = useCallback(() => {
		console.log('fetching', route);
		let keyObj = {};
		let filterArr = (arr) => arr.filter(filter);
		if (!noKey) keyObj.key = apiKey ? apiKey : mainKey;
		let queryObj = { ...keyObj, ...queries };
		return api({ 
			route,
			queries: queryObj
		})
		.then(results => {
			console.log('good!', results);
			onSuccess();
			results[collection] = results[collection] ? filterArr(results[collection]) : [];			
			setStatus(1);
			setContent(results);
		})
		.catch(errors => {
			console.log('bad', errors);
			setStatus(3);
			setError(errors);
		});
	},[apiKey, filter, collection, onSuccess, noKey, route, queries]);

	useEffect(() => {
		if (!status) {
			setStatus(1);
			fetch();}
	},[fetch, status, watch]);

	return {
		content, // state containing results of the API response
		setContent, // manipulate API response state directly
		fetch, // function to trigger API fetch directly
		status, // 0 = idle, 1 = processing, 2 = complete, 3 = error
		setStatus, // used to reset API fetched status manually
		error, // if response returns an error it is stored here
		setError // set the error manually
	};
};