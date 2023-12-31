import { createBrowserHistory, createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
	const history =
		defaultHistory ||
		createMemoryHistory({
			initialEntries: [initialPath],
		});

	if (onNavigate) {
		history.listen(onNavigate);
	}

	ReactDOM.render(<App history={history} />, element);

	return {
		onParentNavigate({ pathname: nextPathname }) {
			const { pathname } = history.location;
			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		},
	};
};

if (process.env.NODE_ENV === "development") {
	const devRoot = document.querySelector("#_marketing-dev-root");

	devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };
