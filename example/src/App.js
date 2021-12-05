import React, { useState } from 'react'
import { useRelay } from 'hangers'
import Request from './components/Request';

const ResponseBody = ({content}) => {return <ul className='body-section'>
		{ content && content.results ? content.results.map((item, i) => <li key={i}>
			{ item.section }
		</li>) : 'nothing'}
	</ul>;	
};

export default function App(props) {
	const [toggle, setToggle] = useState(false);
	const { response, status, setStatus } = useRelay({
		baseState: { a: 'hello', b: 'world', c: '', persist: true },
		delay: 3000,
		url: 'v1/resources/test-collection',
		itemNames: 'characters',
		keyName: 'key',
		paused: true,
		//apiKey: null,
		debug: true,
		watch: toggle,
		objectify: true,
		onSuccess: (res) => console.log('😎 GOOD', res),
		onError: (error) => console.log('😩 BAD', error)
	});

	const explainStatus = (value) => {switch (value) {
		default: return 'error';
		case -1: return 'paused';
		case 0: return 'staged';
		case 1: return 'in progress';
		case 2: return 'success';
	}};

	return <div className='page-body'>
		<h1>hangers</h1>
		<span>a collection of react hooks</span>
		<div className='hook-body'>
			<div className='body-section'>
				<h2>useRelay</h2>
				<p>
					Fetches an API endpoint and returns the reponse in easily accesible state.
				</p>
				<button onClick={() => setStatus(0)}>Fetch</button>
				<button onClick={() => setToggle(true)}>Trigger watch change</button>
			</div>
			<div className='body-section'>
				Status: { status + ' Description: ' + explainStatus(status) }
			</div>
			<ResponseBody content={response} status={status}/>
		</div>
		<Request />
	</div>
}