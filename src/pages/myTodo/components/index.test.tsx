import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/test-utils";
import { useAddTodoMutation } from "../../../features/apiSlice";
import AddTodo from "./AddTodo";

jest.mock("../../../features/apiSlice", () => ({
	...jest.requireActual("../../../features/apiSlice"),
	useAddTodoMutation: jest.fn(),
}));

describe("AddTodo Component", () => {
	const mockAddTodo = jest.fn();

	beforeEach(() => {
		(useAddTodoMutation as jest.Mock).mockReturnValue([mockAddTodo]);
		jest.clearAllMocks();
	});

	test("renders form elements correctly", () => {
		renderWithProviders(<AddTodo userId={1} />);

		expect(screen.getByTestId("todo-input")).toBeInTheDocument();
		expect(screen.getByTestId("submit-button")).toBeInTheDocument();
	});

	test("displays an error when trying to submit an empty form", async () => {
		renderWithProviders(<AddTodo userId={1} />);

		fireEvent.click(screen.getByTestId("submit-button"));

		await waitFor(() => {
			expect(screen.getByTestId("error-message")).toHaveTextContent(
				"This field is required"
			);
		});
	});

	test("submits form successfully with valid input", async () => {
		renderWithProviders(<AddTodo userId={1} />);

		const input = screen.getByTestId("todo-input");
		userEvent.type(input, "New Todo");

		fireEvent.click(screen.getByTestId("submit-button"));

		await waitFor(() => {
			expect(mockAddTodo).toHaveBeenCalledWith({
				completed: false,
				title: "New Todo",
				userId: 1,
			});
		});

		expect(input).toHaveValue("");
	});
});
