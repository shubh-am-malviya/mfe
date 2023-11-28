import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { mount as marketingMount } from "marketing/MarketingApp";

export default () => {
	const ref = useRef();
	const history = useHistory();

	useEffect(() => {
		const { onParentNavigate } = marketingMount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathname }) => {
				const { pathname } = history.location;
				if (pathname !== nextPathname) {
					history.push(nextPathname);
				}
			},
		});

		history.listen(onParentNavigate);
	}, []);

	return <div ref={ref}></div>;
};
