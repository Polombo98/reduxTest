import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "./constants";
import Error from "./pages/error";

describe("Routing works properly", () => {
	const router = createMemoryRouter(
		[{ errorElement: <Error />, children: routes }],
		{ initialEntries: ["/"] }
	);

	beforeEach(() => {
		router.navigate("/");
	});

	test("Renders landing page for the initial route when when user is not authorized", () => {
		const pageTestId = "landing-page";
		render(<RouterProvider router={router} />);
		expect(screen.getByTestId(pageTestId)).toBeVisible();
	});

	test("Error page is rendered when user tries to access non existing route", () => {
		const pageTestId = "error-page";
		router.navigate("/non-existing-route");
		// Hide warning for unrecognized route
		const consoleWarnSpy = jest
			.spyOn(console, "warn")
			.mockImplementation((message, ...args) => {
				if (
					typeof message === "string" &&
					message.includes("No routes matched location")
				) {
					// Suppress this specific warning
					return;
				}
				// Call the original console.warn for other warnings
				consoleWarnSpy.mock.calls.push([message, ...args]);
			});
		render(<RouterProvider router={router} />);
		expect(screen.getByTestId(pageTestId)).toBeVisible();
	});
});
