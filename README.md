# hangers
An assortment of React hooks.

[![NPM](https://img.shields.io/npm/v/hangers.svg)](https://www.npmjs.com/package/hangers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add hangers -s
```

## Hooks

### useBusy

This hook extends [react-spring ](https://react-spring.io) with a "busy" boolean that is true while a spring is animating.

#### Usage 

```jsx
const [busy, busyConfig] = useBusy({ onStart: yourFunction }); // because useBusy utilizes react-spring onStart/onRest params, you can pass through your own here. 

const transitions = useSpring(value, {
  ...yourSpringParams,
  ...busyConfig // adds onStart and onRest
});

```

### useKeyInput

Provides a function to used either with onKeyUp or onKeyDown component props. The actions the function performs is assigned via an object where each keycode corresponds with name-value pair. The values can be functions to perform, or the value can be a sub-object which contains the desired function as well and options to conditionally block or to use peventDefault per key.

#### Usage

```jsx

  const keySet = {
    '37': { // name corresponding with a key code value (left arrow here)
      disable: false, // if true disables any action on this key
      default: false, // if false preventDefault() is applied to this key
      keydown: e => setKey(e.key), // a function to perfom on keydown
      keyup: e => { e.debug('hello world') } //  ... or keyup
      /* .debug() is attached to the events, which if used will log the eveny detail and any value you share with it */
    },
    '38': e => setKey(e.key), // a function rather than an object will apply to keydown events
    other: e => { // assign functions to all other keys
      e.preventDefault(); // all the standard event props are accessible
    },
  };

  const keyInput = useKeyInput({ 
    defaultAll, // if false .preventDefault() will be applied to all keys (default: true)
    disabled, // disable all actions if true
    keySet, // the object above
    keydown, // if true, only keydown events will activate
    keyup // if true, only keyup events will activate
  });

  return <input type='text' onKeyDown={keyInput} onKeyUp={keyInput} />; // apply the function to the components

```

#### Parameters
- `defaultAll (boolean, default true)`: if false preventDefault() will apply to all keys.
- `disabled (boolean, default false)`: if true all no action will be applied to any event.
- `keySet (object)`: An object individually defining actions per key code.
- `keydown (boolean, default: false)`: If true keydown runs solo, with keyup disabled.
- `keyup (boolean, default: false)`: If true keyup runs solo, with keydown disabled.

#### Returned
- `keyInput (function)`: Place as the value of keydown and/or keyup. It will know what to do based on the event type.

### useKeyListen

Based on useKeyInput, but rather than provide a function to attach to onKeyUp/onKeyDown props, it instead creates document-level listeners.

It uses the same params as useKeyInput above, just without the provided function.

```jsx
  useKeyListen({ 
    defaultAll, // if false .preventDefault() will be applied to all keys (default: true)
    disabled, // disable all actions if true
    keySet, // an object defining actions (see useKeyInput above)
    keydown, // if true, only keydown events will activate
    keyup // if true, only keyup events will activate
  });

```

### usePagination

Recieves a number, typically the length of an array of pages, and returns values and functions to navigate within that number range.

#### Usage

```jsx
const { atEnd, atStart, back, count, forward, goTo, page } = useRelay({
  count: 371,
});

return (
  <div>
    <div>
      <button onClick={back} disabled={atStart}>Back</button>
      <button onClick={forward} disabled={atEnd}>Forward</button>
    <div>
      <input type='number' value={reqPg} onChange={e => setReqPg(e.target.value)} />
      <button onClick={() => goTo(reqPg - 1)} disabled={reqPg < 1 || reqPg > count}>Go to page</button>
    </div>
    <div>
      Page: { page + 1 } of { count }
    </div>
  </div>
);

```

#### Parameters
- `count (number, default 0)`: How many pages you want to navigate through.
- `initial (number, default 0)`: Set an initial first page.
- `onChange (function)`: A function to run when a page change occurs.

#### Returned
- `active (boolean)`: True if a page change has occured.
- `atEnd (boolean)`: True if at the last page.
- `atStart (boolean)`: True if at the first page.
- `back (function)`: will go to the previous page (if above -1).
- `count (number)`: The count number provided above.
- `direction (number, 0 or 1)`: The current direction (0 = back/left 1 = forward/right), set on page changes.
- `forward (function)`: will go to the next page (if below count).
- `goTo (function)`: will go to a page provided a parameter `goto(123)` if the number is within the count range.
- `page (number)`: The current page number.

### useRefState

Provides a ref which will be stored in state when the target component renders. A function can be provided to the hook which can transform/isolate the ref before it is stored.

#### Usage

```jsx
const [clientHeight, setRef] = useStateRef(node => (node?.clientHeight || 0));


// here the component height only is stored in state

```

#### Parameter
- `function`: This function recieves the target node ref as a callback, which can be manipulated (or not) and whatever is returned from this function will be stored in state

#### Returned
- `node (react node object)`: The node stored in state.
- `setRef (react ref)`: The ref to apply to a component.

### useRelay

An extension of useRequest, this hook with minimal configuration alongside standard [Axios](https://github.com/axios/axios) parameters, will request an API endpoint and store it in easily accessible and manipulated state. As the request progresses, a numeric status value is updated, from 0 for staged, 1 for in-progress, 2 for successful, 3 for error. The default 0 will make an automatic request unless the `paused` option is set to true. While paused the status is -1 so using the provided function `setStatus(0)` could be used to conditionally make a request. This can be coupled with the option `delay: 3000` to do something like timed conditional auto-saves. Or you can trigger requests when a value changes using the `watch` param.

A successful request is stored in the `response` state, or in `error` if otberwise. Corresponding functions to run at completion can be passed via `onSuccess` and `onError` params, while `filter` can be used alongside `itemNames` to filter a primary array in the response.

Default API keys and base URLs can be set as the enviroment variables REACT_APP_API_MAIN_KEY and REACT_APP_API_MAIN_URL

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
- `delay (number, default 0)`: Delay before executing request in miliseconds.
- `paused (boolean, default undefined)`: Pause the initial automatic API request.
- `retry (boolean, default undefined)`: If true another request attempt will be made when an error occurs.
- `slowOnError (boolean, default undefined)`: If true the delay will be applied to fetches made after an error response
- `watch (any, default undefined)`: If value changes, trigger a request.

#### Returned
- `hold (boolean)`: If a request is not being processed (paused, successful, or error) then this will be false.
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
- `apiKey or key (string or null)`: an api key to overide the default api key, or set to null to use no key.
- `auth (string)`: JWT access token.
- `baseState (object)`: base values to populate the response state. If baseState.basePesist is true then the these base values will remain if a failed second request or reset occurs. 
- `debug (boolean)`: if true the fetched URL and query object (with includes an API key) will be console logged.
- `filter (function)`:  a [array filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to apply to the main collection, for example filtering authors for a set of retrieved articles.
- `itemNames (string)`: Designate a main collection within the response object. For example if your API includes an array named 'users' you can state so here, which enables filtering. If undefined the main collection will be named 'items'.
- `keyName (string)`: rename the apiKey param key. For example from `apiKey=abc123` to `myValue=abc123`, or use the enviroment variable `REACT_APP_API_MAIN_URL`.
- `params (object)`: Key/value pairs within this object will be converted to a param string which is appended to requested URL, following an API key if present.
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
