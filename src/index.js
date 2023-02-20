import React from 'react';
import { createRoot } from 'react-dom/client';
import { useRelay } from './lib';

export default function App() {
	const { ...rest } = useRelay({
		baseState: { a: 'hello', b: 'world', c: '', persist: true },
		url: 'v1/resources/test-collection',
		itemNames: 'characters',
		keyName: 'key',
		paused: true,
		onSuccess: (res) => console.log('😎 GOOD', res, rest),
		onError: (error) => console.log('😩 BAD', error)
	  });
  return <div>
	  <h1>Hangers</h1>
  </div>;
};

createRoot( document.getElementById('root')).render(<App/>);
