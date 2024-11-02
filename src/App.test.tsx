import { render, screen } from "@testing-library/react";
import App from "./App";

test("Header is present on all pages", () => {
	render(<App />);
	const headerTestId = "header";
	expect(screen.getByTestId(headerTestId)).toBeVisible();
});
