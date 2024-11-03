import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import {
	useDeleteTodoMutation,
	useGetUserTodosQuery,
	useUpdateTodoMutation,
} from "../../features/apiSlice";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../features/authSlice";
import AddTodo from "./components/AddTodo";

const MyTodo: FC = () => {
	const { id: authUserId } = useAppSelector(selectAuth);
	const { data } = useGetUserTodosQuery(authUserId);
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const colDefs: ColDef[] = [
		{ field: "completed", flex: 1, editable: true },
		{ field: "id", flex: 1, hide: true },
		{ field: "title", flex: 10, editable: true },
		{
			headerName: "Actions",
			field: "actions",
			cellRenderer: (params: ICellRendererParams) => (
				<Button
					variant="danger"
					data-testid={`delete-button-${params.data.id}`}
					onClick={() =>
						deleteTodo({ id: params.data.id, userId: authUserId })
					}
				>
					Delete
				</Button>
			),
			width: 110,
		},
	];

	return (
		<Container className="ag-theme-quartz" style={{ height: 500 }}>
			<AddTodo userId={authUserId} />
			<AgGridReact
				suppressScrollOnNewData
				suppressChangeDetection
				suppressAutoSize
				data-testid="todo-grid"
				onCellValueChanged={(event) =>
					updateTodo({ ...event.data, userId: authUserId })
				}
				rowData={data?.map(({ completed, id, title }) => ({
					completed,
					id,
					title,
				}))}
				columnDefs={colDefs}
			/>
		</Container>
	);
};

export default MyTodo;
