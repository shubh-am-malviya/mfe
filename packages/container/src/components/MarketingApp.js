import React, { useEffect, useRef } from "react";

import { mount as marketingMount } from "marketing/MarketingApp";

export default () => {
	const ref = useRef();

	useEffect(() => {
		marketingMount(ref.current);
	}, []);

	return <div ref={ref}></div>;
};
