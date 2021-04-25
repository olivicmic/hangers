import React, { useState } from 'react'
import { useAPI } from 'hangers'
//import 'hangers/dist/index.css'
//

const ResponseBody = ({content, status}) => {
	if (!status) return '...';
	else return <ul className='body-section'>
		{ content.results ? content.results.map((item, i) => <li key={i}>
			{ item.section }
		</li>) : 'nothing'}
	</ul>;	
};

export default function App(props) {
	const [toggle, setToggle] = useState(false);
	const { response, status, setStatus } = useAPI({
		subRoute: 'categories',
		itemNames: 'results',
		paused: true,
		apiKey: null,
		debug: true,
		watch: toggle,
		onSuccess: (res) => console.log(res),
		onError: (error) => console.log(error)
	});

	return <div className='page-body'>
		<h1>hangers</h1>
		<span>a collection of react hooks</span>
		<div className='hook-body'>
			<div className='body-section'>
				<h2>useAPI</h2>
				<p>
					Fetches an API endpoint and returns the reponse in easily accesible state.
				</p>
				<button onClick={() => setStatus(0)}>Fetch</button>
				<button onClick={() => setToggle(true)}>Trigger watch change</button>
			</div>
			<div className='body-section'>
				Status: { status }
			</div>
			<ResponseBody content={response} status={status}/>
		</div>
	</div>
}