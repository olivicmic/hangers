import React from 'react'
import { useAPI } from 'hangers'
//import 'hangers/dist/index.css'
//

const ResponseBody = ({content, status}) => {
	if (!status) return '...';
	else return <ul className='body-section'>
		{ content.results ? content.results.map((item, i) => <li>
			{ item.section }
		</li>) : 'nothing'}
	</ul>;	
};

export default function App(props) {
	const { content, status } = useAPI({
		route: 'https://api.vics.pics/v1/categories',
		itemNames: 'results',
		noKey: true
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
				<button onClick={() => console.log({ hello: 'world' })}>Hey</button>
			</div>
			<ResponseBody content={content} status={status}/>
		</div>
	</div>
}