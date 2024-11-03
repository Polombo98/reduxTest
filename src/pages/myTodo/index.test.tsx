import { renderWithProviders } from "../../utils/test-utils";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import MyTodo from ".";
import {
	useGetUserTodosQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} from "../../features/apiSlice";
import { useAppSelector } from "../../hooks";

// Mock API hooks
jest.mock("../../features/apiSlice", () => ({
	...jest.requireActual("../../features/apiSlice"),
	useGetUserTodosQuery: jest.fn(),
	useUpdateTodoMutation: jest.fn(),
	useDeleteTodoMutation: jest.fn(),
}));

jest.mock("../../hooks", () => ({
	...jest.requireActual("../../hooks"),
	useAppSelector: jest.fn(),
}));

describe("MyTodo Component", () => {
	const mockUpdateTodo = jest.fn();
	const mockDeleteTodo = jest.fn();

	beforeEach(() => {
		// Mocking hooks with example data
		(useGetUserTodosQuery as jest.Mock).mockReturnValue({
			data: [
				{ id: 1, title: "Test Todo 1", completed: false, userId: 1 },
				{ id: 2, title: "Test Todo 2", completed: true, userId: 1 },
			],
		});
		(useUpdateTodoMutation as jest.Mock).mockReturnValue([mockUpdateTodo]);
		(useDeleteTodoMutation as jest.Mock).mockReturnValue([mockDeleteTodo]);
		(useAppSelector as unknown as jest.Mock).mockReturnValue({ id: 1 });
		jest.clearAllMocks();
	});

	test("renders AddTodo component and data grid", async () => {
		renderWithProviders(<MyTodo />);

		// Verify AddTodo component is present
		expect(
			screen.getByPlaceholderText("Enter your task")
		).toBeInTheDocument();

		// Verify each row individually
		expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
		expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
	});

	test("deletes a todo item when delete button is clicked", async () => {
		renderWithProviders(<MyTodo />);

		// Click delete button for the first todo item
		const deleteButton = screen.getByTestId("delete-button-1");
		fireEvent.click(deleteButton);

		// Verify deleteTodo mutation is called with correct data
		await waitFor(() => {
			expect(mockDeleteTodo).toHaveBeenCalledWith({ id: 1, userId: 1 });
		});
	});
});
