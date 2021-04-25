# hangers
An assortment of React hooks.

[![NPM](https://img.shields.io/npm/v/hangers.svg)](https://www.npmjs.com/package/hangers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i hangers -s
```

## Hooks

### useAPI

A hook that will automatically fetch an API endpoint (via [Axios](https://github.com/axios/axios)), that stores the server response in its state, while providing a status value indicating multiple progress states, as well as functions to directly manipulate state or initiate manual fetches. For endpoints that use queries, you can pass an object of strings which encoded and appended to the request. Additionally a default main url and API key can be set via the REACT_APP_API_MAIN_URL and REACT_APP_API_MAIN_KEY enviromental variables. 

#### Usage

```jsx
import { useAPI } from 'hangers';

export default function MyComponent(props) {
	const { content } = useAPI({
		subRoute: 'articles'
	});
};

```
#### Parameters
- `apiKey (string or null)`: an api key to overide the default api key, or set to null to use no key
-  `debug (boolean)`: if true the fetched URL and query object (with includes an API key) will be console logged.
- `filter (function)`:  a [array filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to apply to the main collection, for example filtering authors for a set of retrieved articles.
- `itemNames (string)`: Designate a main collection within the response object. For example if your API includes an array named 'users' you can state so here, which enables filtering. If undefined the main collection will be named 'items'.
- `onSuccess (function)`:  A function to run on a successful API fetch.
- `paused (boolean)`: Pause the initial automatic API fetch.
- `route (string)`: Full URL of an API endpoint. The default main url enviromental variable, will not be used.
- `subRoute (string)`: A sub-path that is appended to the default main url, for example if your main url is *https://mysite.com/api/v1/* subRoute would be something like 'articles'
-  `queries (object)`: An object of strings to be encoded and appended to the request url. For example `{ sortBy: 'date', search: 'bananas'}` becomes `?sortBy=date&search=bananas`
- `watch (any)`: If value changes, trigger a fetch.

#### Declarations
- `content (state object)`: This object is where the the API response is stored if successful. It is an empty object otherwise.
- `setContent (function)`: A function to set the response state object manually. Say, to edit or clear it like `setContent({})`.
- `fetch (function)`: Directly use the `fetch();` function with the existing useAPI parameters and state.
- `status (number -1 to 3)`: If this equals -1 the status is paused, if 0 it is staged and will trigger an automatic fetch, 1 means the fetch is in progress, 2 if the fetch was successful, and 3 if there was an error.
- `setStatus (function)`: To manually set the status, for example to set the status to 0 `setStatus(0);` and trigger a fetch.
- `error (state object)`: If an error occurs the content of the error will be stored here.
- `setError (function)`: To manually set the error state use this function, such as `setError({});` to clear the error object.


## License

MIT © [olivicmic](https://github.com/olivicmic)
