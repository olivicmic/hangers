# hangers
An assortment of React hooks.

[![NPM](https://img.shields.io/npm/v/hangers.svg)](https://www.npmjs.com/package/hangers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i hangers -s
```

## Hooks

### useRelay

An extension of useRequest, this hook with minimal configuration alongside standard [Axios](https://github.com/axios/axios) parameters, will request an API endpoint and store it in easily accessible and manipulated state. As the request progresses, a numeric status value is updated, from 0 for staged, 1 for in-progress, 2 for successful, 3 for error. The default 0 will make an automatic request unless the `paused` option is set to true. While paused the status is -1 so using the provided function `setStatus(0)` could be used to conditionally make a request. This can be coupled with the option `delay: 3000` to do something like timed conditional auto-saves. Or you can trigger requests when a value changes using the `watch` param.

A successful request is stored in the `response` state, or in `error` if otberwise. Corresponding functions to run at completion can be passed via `onSuccess` and `onError` params, while `filter` can be used alongside `itemNames` to filter a primary array in the response.

Default API keys and base URLs can be set as the enviromental variables REACT_APP_API_MAIN_KEY and REACT_APP_API_MAIN_URL

See useRequest for further details.

#### Usage

```jsx
const { response: articleContent, status } = useRelay({
	url: 'articles',
});

return (
	<div>
		{ articleContent ? articleContent.title : '...'}
	</div>
);

/* or shorthand */

const { response, status } = useRelay('articles');

```

#### Parameters
- `delay (number)`: Delay before executing request in miliseconds.
- `paused (boolean)`: Pause the initial automatic API request.
- `watch (any)`: If value changes, trigger a request.


#### Returned
- `status (number -1 to 3)`: If this equals -1 the status is paused, if 0 it is staged and will trigger an automatic request, 1 means the request is in progress, 2 if the request was successful, and 3 if there was an error.
- `setStatus (function)`: To manually set the status, for example to set the status to 0 `setStatus(0);` and trigger a request.

### useRequest

This hook automatically requests an API endpoint and stores the response in easily accesible state. Functions to be ran upon completion can be passed via the `onError` and `onSucces` parameters.

Default API keys and base URLs can be set as the enviromental variables REACT_APP_API_MAIN_KEY and REACT_APP_API_MAIN_URL

Beyond what is detailed here, requests can be futher configured with standard [Axios](https://github.com/axios/axios) parameters.

#### Usage

```jsx
const { request, response } = useRequest({
	url: 'users',
	onSucess: (res) => console.log('Done!', res);
	params: { page }
});

return (
	<div>
		{ response ? response.items : '...'}
	</div>
);

/* or shorthand */

const { request, response } = useRequest('users');

```

#### Parameters
- `apiKey (string or null)`: an api key to overide the default api key, or set to null to use no key.
- `auth (string)`: JWT access token.
- `debug (boolean)`: if true the fetched URL and query object (with includes an API key) will be console logged.
- `filter (function)`:  a [array filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to apply to the main collection, for example filtering authors for a set of retrieved articles.
- `itemNames (string)`: Designate a main collection within the response object. For example if your API includes an array named 'users' you can state so here, which enables filtering. If undefined the main collection will be named 'items'.
- `onError (function)`:  A function to run when an error occurs. Recieves response error object as a callback: `const onError = (error) => console.log(error);`.
- `onSuccess (function)`:  A function to run on a successful API request. Recieves response object as a callback: `const onSuccess = (response) => console.log(response);`.


#### Returned
- `response (state object)`: This object is where the the API response is stored if successful. It is an empty object otherwise.
- `setResponse (function)`: A function to set the response state object manually. Say, to edit or clear it like `setResponse({})`.
- `request (function)`: Directly use the `request();` function with the existing useAPI parameters and state.
- `error (state object)`: If an error occurs the content of the error will be stored here.
- `setError (function)`: To manually set the error state use this function, such as `setError({});` to clear the error object.
- `resetState (function)`: Use to reset the response and error state. They can be reset seperately excluded by passing `keepContent` or `keepError` via a param object like `resetState({ keepContent: true })`.


## License

MIT © [olivicmic](https://github.com/olivicmic)
