import React, { useState } from 'react';
import { useKeyListen } from 'hangers';

export default function KeyPress({}) {
	const [key, setKey] = useState('None');
	const [disabled, setDisabled] = useState(true);
	const keyTemplate = n => ({
		disabled: false, // if true disable custom
		default: false, // if false prevent event default
		keydown: e => e.debug(n),
		keyup: e => {e.debug(n); setKey(e.key)}
	});

	const keySet = {
		'37': {
			...keyTemplate('left')
		},
		'38': e => {e.debug('up'); setKey(e.key)},
		'39': {
			...keyTemplate('right')
		},
		'40': {
			...keyTemplate('down')
		},
		'68': {
			...keyTemplate('D')
		}
	};

	useKeyListen({ disabled, keySet, keyup: true });
	
	return <div className='hook-body'>
		<div className='body-section'>
			<h2>useKeyListen</h2>
			<p>
				Based on useKeyInput, but rather than provide a function to attach to onKeyUp/onKeyDown props, it instead creates document-level listeners. 
			</p>
		</div>
		<div className='body-section'>
			<div><button onClick={() => setDisabled(!disabled)}>{ disabled ? 'Off' : 'On' }</button></div>
			<h3>Last key pressed:</h3>
			<span>(Press an arrow key for this example)</span>
			<p>{ key }</p>
		</div>
	</div>;
};