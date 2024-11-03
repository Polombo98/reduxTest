import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils"; // Import the custom render function
import AuthButton from "./index";

describe("AuthButton Component", () => {
	const handleLogin = jest.fn();
	const handleLogout = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders Login button when user is not authorized", () => {
		renderWithProviders(
			<AuthButton
				isAuthorized={false}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
			/>
		);

		const loginButton = screen.getByTestId("login-button");
		expect(loginButton).toBeVisible();

		fireEvent.click(loginButton);
		expect(handleLogin).toHaveBeenCalledTimes(1);
	});

	test("renders Logout button when user is authorized", () => {
		renderWithProviders(
			<AuthButton
				isAuthorized={true}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
			/>
		);

		const logoutButton = screen.getByTestId("logout-button");
		expect(logoutButton).toBeVisible();

		fireEvent.click(logoutButton);
		expect(handleLogout).toHaveBeenCalledTimes(1);
	});
});
