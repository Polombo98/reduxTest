import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./utils/test-utils";

test("Header is present on all pages", () => {
	renderWithProviders(<App />);
	const headerTestId = "header";
	expect(screen.getByTestId(headerTestId)).toBeVisible();
});
