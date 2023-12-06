import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
	productionPrefix: "co",
});

const App = () => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	return (
		<StylesProvider generateClassName={generateClassName}>
			<BrowserRouter>
				<div>
					<Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthLazy onSignIn={() => setIsSignedIn(true)} />
							</Route>
							<Route path="/" component={MarketingLazy} />
						</Switch>
					</Suspense>
				</div>
			</BrowserRouter>
		</StylesProvider>
	);
};

export default App;
