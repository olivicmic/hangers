import { useState } from 'react';

export default function useHover(props) {
	const [ hover, hoverSet ] = useState(false);
	return [ hover, { onMouseEnter: () => hoverSet(true), onMouseLeave: () => hoverSet(false) }];
};