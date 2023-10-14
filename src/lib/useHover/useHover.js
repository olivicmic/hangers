import { useState } from 'react';

export default function useHover({ onMouseEnter = () => {}, onMouseLeave = () => {} }) {
	const [ hover, hoverSet ] = useState(false);
	const onHover = x => () => { hoverSet(x); x ? onMouseEnter() : onMouseLeave() };
	return [ hover, { onMouseEnter: onHover(true), onMouseLeave: onHover(false)}];
};