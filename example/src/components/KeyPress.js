import React, { useState } from 'react';
import { useKeyListen } from 'hangers';

export default function KeyPress({}) {
	const [key, setKey] = useState('None');
	const [disabled, setDisabled] = useState(true);
	const keyTemplate = n => ({
		block: false, // if true disable custom
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

	useKeyListen({ disabled, keySet, keydown: 'butt' });
	
	return <div className='hook-body'>
		<div className='body-section'>
			<h2>useKeyListen</h2>
			<p>
				Listens for key inputs based on an object where each keycode is assigned an object key which values can be functions to perform on the key release, or the value can be a sub-object which contains the desired function as well and options to conditionally block or to use peventDefault per key.
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