import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { mount as authMount } from "auth/AuthApp";

export default () => {
	const ref = useRef();
	const history = useHistory();

	useEffect(() => {
		const { onParentNavigate } = authMount(ref.current, {
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
