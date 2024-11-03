import { screen } from "@testing-library/react";

import Landing from ".";
import { renderWithProviders } from "../../utils/test-utils";

describe("Landing page works properly", () => {
	renderWithProviders(<Landing />);
	test("WelcomeText component is being rendered", () =>
		expect(screen.getByTestId("welcome-text")).toBeVisible());
});
