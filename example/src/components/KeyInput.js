import React, { useState } from 'react';
import { useKeyInput } from 'hangers';

export default function KeyListen({}) {
	const [key, setKey] = useState('None');
	const [disabled, setDisabled] = useState(true);
	const keyTemplate = n => ({
		disabled: false, // if true disable custom
		default: false, // if false prevent event default
		keydown: e => e.debug(n),
		keyup: e => {e.debug(n); setKey(e.key); console.log('separate keyup command');}
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
		other: e => {
			e.preventDefault();
			e.debug('other key 😎'); 
			setKey(e.key);
			alert('I didn\'t say type');
		},
	};

	const keyInput = useKeyInput({ disabled, keySet, keyup: true });
	
	return <div className='hook-body'>
		<div className='body-section'>
			<h2>useKeyInput</h2>
			<p>
				Provides a function to used either with onKeyUp or onKeyDown component props. The actions the function performs is assigned via an object where each keycode corresponds with name-value pair. The values can be functions to perform, or the value can be a sub-object which contains the desired function as well and options to conditionally block or to use peventDefault per key.
			</p>
		</div>
		<div className='body-section'>
			<div>
				<button onClick={() => setDisabled(!disabled)}>{ disabled ? 'Off' : 'On' }</button>
				<input type='text' placeholder='press arrow keys in me' onKeyDown={keyInput} onKeyUp={keyInput} />
			</div>
			<h3>Last key pressed:</h3>
			<span>(Press an arrow key for this example)</span>
			<p>{ key }</p>
		</div>
	</div>;
};