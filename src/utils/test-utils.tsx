import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import type { AppStore, RootState } from "../store";
import { setupStore } from "../store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
	route?: string;
}

export function renderWithProviders(
	ui: React.ReactElement,
	extendedRenderOptions: ExtendedRenderOptions = {}
) {
	const {
		preloadedState = {},
		store = setupStore(preloadedState),
		route = "/",
		...renderOptions
	} = extendedRenderOptions;

	const Wrapper = ({ children }: PropsWithChildren) => (
		<Provider store={store}>
			<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
		</Provider>
	);

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}
