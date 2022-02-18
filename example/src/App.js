import React, { useState } from 'react'
import { usePagination, useRelay, useStateRef } from 'hangers'
import Request from './components/Request';
import KeyListen from './components/KeyListen';
import KeyInput from './components/KeyInput';

const ResponseBody = ({content}) => {return <ul className='body-section'>
		{ content && content.results ? content.results.map((item, i) => <li key={i}>
			{ item.section }
		</li>) : 'nothing'}
	</ul>;	
};


export default function App(props) {
	const [reqPg, setReqPg] = useState(1);
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
	const pgn = usePagination({ count: 99 });
	const [clientHeight, setRef] = useStateRef(node => (node?.clientHeight || 0));

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
					Attaches a status to REST requests, allowing for tracking or manual throttling through 'paused', 'staged/ready', 'in progress', 'success' and 'error' states
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
		<KeyInput />
		<KeyListen />
		<div className='hook-body'>
			<div className='body-section'>			
				<h2>usePagination</h2>
				<p>
					Recieves a number of pages and provides values and functions to navigate within them.
				</p>
				<div>
					<button onClick={pgn.back} disabled={pgn.atStart}>Back</button>
					<button onClick={pgn.forward} disabled={pgn.atEnd}>Forward</button>
					<div>
						<input type='number' value={reqPg} onChange={e => setReqPg(e.target.value)} />
						<button onClick={() => pgn.goTo(reqPg - 1)} disabled={reqPg < 1 || reqPg > pgn.count}>Go to page</button>
					</div>
				</div>			
				<div>
					Page: { pgn.page + 1 } of { pgn.count }
				</div>
			</div>
		</div>
		<div className='hook-body' ref={setRef}>
			<div className='body-section'>			
				<h2>useStateRef</h2>
				<p>
					Provides a ref then stores it in state when the target component renders.
				</p>
				<div>
					This box is {clientHeight} pixels tall (via ref).
				</div>
			</div>
		</div>
	</div>
}