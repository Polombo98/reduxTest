import { render, screen } from "@testing-library/react";

import Landing from ".";

describe("Landing page works properly", () => {
	render(<Landing />);
	test("WelcomeText component is being rendered", () =>
		expect(screen.getByTestId("welcome-text")).toBeVisible());
});
