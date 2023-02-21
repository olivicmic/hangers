import React from 'react';
import { createRoot } from 'react-dom/client';
import { useInput, useRelay } from './lib';

export default function App() {
	console.log(useInput);
	const { setStatus, ...rest } = useRelay({
		baseURL: 'http://localhost:3000',
		baseState: { a: 'hello', b: 'world', c: '', persist: true },
		debug: {location: 'butt'},
		url: 'v1/resources/test-collection',
		itemNames: 'characters',
		keyName: 'key',
		paused: true,
		onSuccess: (res) => console.log('😎 GOOD', res, rest),
		onError: (error) => console.log('😩 BAD', error)
	  });
  return <div>
	  <h1>Hangers</h1>
	  <button onClick={e => setStatus(0)}>cleeq</button>
  </div>;
};

createRoot( document.getElementById('root')).render(<App/>);
