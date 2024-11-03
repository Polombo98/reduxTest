import { FC, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Container } from "react-bootstrap";
import { useGetUsersQuery, useGetAllTodosQuery } from "../../features/apiSlice";

const Summary: FC = () => {
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const { data: todos, isLoading: todosLoading } = useGetAllTodosQuery();

	const usersSummary = useMemo(() => {
		if (!users?.length || !todos?.length) return [];

		return users.map((user) => {
			const userTodos = todos.filter((todo) => todo.userId === user.id);
			const completedTodos = userTodos.filter(
				(todo) => todo.completed
			).length;
			const incompleteTodos = userTodos.length - completedTodos;

			return {
				username: user.username,
				completedTodos,
				incompleteTodos,
			};
		});
	}, [users, todos]);

	const columnDefs: ColDef[] = [
		{ headerName: "Username", field: "username", flex: 3 },
		{
			headerName: "Total Completed Todos",
			field: "completedTodos",
			flex: 1,
		},
		{
			headerName: "Total Incomplete Todos",
			field: "incompleteTodos",
			flex: 1,
		},
	];

	// Loading state handling
	if (usersLoading || todosLoading) {
		return <p>Loading...</p>;
	}

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">User Summary</h2>
			<div
				className="ag-theme-quartz"
				style={{ height: 400, width: "100%" }}
			>
				<AgGridReact
					rowData={usersSummary}
					columnDefs={columnDefs}
					domLayout="autoHeight"
				/>
			</div>
		</Container>
	);
};

export default Summary;
