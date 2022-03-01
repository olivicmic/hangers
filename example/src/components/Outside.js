import React, {useEffect} from 'react';
import { useOutside, useStateRef } from 'hangers';

export default function Outside({}) {
	const [ref, setRef] = useStateRef(node => node);

	useOutside(ref, () => console.log("shat"));
	return <div className='hook-body' ref={setRef} key='fucxu'>
		<div className='body-section'>
			<h2>useOutside</h2>
			<p>
				Butts
			</p>
		</div>
		<div className='body-section'>
			<h3>Fuck</h3>
		</div>
	</div>;
};