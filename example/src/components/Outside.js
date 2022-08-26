import React, { useEffect,  useState } from 'react';
import { useInOut, useStateRef } from 'hangers';

export default function Outside({}) {
	const [inOrOut, setInOrOut] = useState('out');
	const [disabled, setOnOff] = useState(true);
	const [ref, setRef] = useStateRef(node => node);

	useInOut({disabled, ref, onIn: () => setInOrOut('in'), onOut: () => setInOrOut('out')});
	return <div className='hook-body' ref={setRef} key='outside-block'>
		<div className='body-section'>
			<h2>useInOut</h2>
			<p>
				Runs functions when you click within or outside an element, dependent on a provided ref.
			</p>
			<button onClick={() => setOnOff(!disabled)}>{disabled ? 'off' : 'on'}</button>
		</div>
		<div className='body-section'>
			<h3>In or out?</h3>
			<p>{inOrOut}</p>
		</div>
	</div>;
};