import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import Summary from ".";
import { useGetUsersQuery, useGetAllTodosQuery } from "../../features/apiSlice";

jest.mock("../../features/apiSlice", () => ({
	...jest.requireActual("../../features/apiSlice"),
	useGetUsersQuery: jest.fn(),
	useGetAllTodosQuery: jest.fn(),
}));

describe("Summary Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("displays loading state while data is fetching", () => {
		(useGetUsersQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: true,
		});
		(useGetAllTodosQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: true,
		});

		renderWithProviders(<Summary />);
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	test("renders user summary with completed and incomplete todos", async () => {
		(useGetUsersQuery as jest.Mock).mockReturnValue({
			data: [
				{ id: 1, username: "user1" },
				{ id: 2, username: "user2" },
			],
			isLoading: false,
		});
		(useGetAllTodosQuery as jest.Mock).mockReturnValue({
			data: [
				{ userId: 1, completed: true },
				{ userId: 1, completed: false },
				{ userId: 2, completed: true },
			],
			isLoading: false,
		});

		renderWithProviders(<Summary />);

		// Verify header
		expect(screen.getByText(/User Summary/i)).toBeInTheDocument();

		// Find rows with specific user content
		expect(screen.getByText("user1")).toBeInTheDocument();
		expect(screen.getByText("user2")).toBeInTheDocument();
	});

	test("displays only header when there are no users or todos", () => {
		(useGetUsersQuery as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
		});
		(useGetAllTodosQuery as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
		});

		renderWithProviders(<Summary />);

		// Ensure that only the header row exists
		const rows = screen.getAllByRole("row");
		expect(rows).toHaveLength(1); // Only the header row
	});
});
