import React from 'react';

import { useRequest } from 'hangers';

const ResponseBody = ({content}) => {return <ul className='body-section'>
		{ content ? content.results.map((item, i) => <li key={i}>
			{ item.section }
		</li>) : 'nothing'}
	</ul>;	
};

export default function Request(props) {
	const { response, request } = useRequest('categories');
	if (!response) request();

	return (<div className='hook-body'>
		<div className='body-section'>
			<h2>useRequest</h2>
			<p>
				Fetches an API endpoint and returns the reponse in easily accesible state.
			</p>
		</div>
		<ResponseBody content={response}/>
	</div>);
};