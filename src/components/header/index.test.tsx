import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./index";
import { renderWithProviders } from "../../utils/test-utils";

describe("Header works properly", () => {
	test("Header renders", () => {
		renderWithProviders(<Header />);
		const headerTestId = "header";
		expect(screen.getByTestId(headerTestId)).toBeVisible();
	});

	test("Logout button visible when the user is authorized", () => {
		renderWithProviders(<Header isAuthorized />);
		const buttonTestId = "logout-button";
		expect(screen.getByTestId(buttonTestId)).toBeVisible();
	});

	test("Login button visible when the user is unauthorized", () => {
		renderWithProviders(<Header isAuthorized={false} />);
		const buttonTestId = "login-button";
		expect(screen.getByTestId(buttonTestId)).toBeVisible();
	});

	test("Login modal opens when login button pressed", () => {
		const buttonTestId = "login-button";
		const modalTestId = "login-modal";
		renderWithProviders(<Header isAuthorized={false} />);
		userEvent.click(screen.getByTestId(buttonTestId));
		expect(screen.getByTestId(modalTestId)).toBeVisible();
	});

	test("Logout modal opens when login button pressed", () => {
		const buttonTestId = "logout-button";
		const modalTestId = "logout-modal";
		renderWithProviders(<Header isAuthorized />);
		userEvent.click(screen.getByTestId(buttonTestId));
		expect(screen.getByTestId(modalTestId)).toBeVisible();
	});
});
