import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type UserData = {
	id: number;
	name: string;
	username: string;
};

export type TodoData = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com/",
	}),
	tagTypes: ["Todo"],
	endpoints: (builder) => ({
		getUsers: builder.query<UserData[], void>({
			query: () => "/users",
		}),
		getAllTodos: builder.query<TodoData[], void>({
			query: () => "/todos",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({
								type: "Todo" as const,
								id,
							})),
							{ type: "Todo", id: "LIST" },
					  ]
					: [{ type: "Todo", id: "LIST" }],
		}),
		getUserTodos: builder.query<TodoData[], number>({
			query: (userId) => `/todos?userId=${userId}`,
			providesTags: (result, error, userId) =>
				result
					? [
							...result.map(({ id }) => ({
								type: "Todo" as const,
								id,
							})),
							{ type: "Todo", id: `LIST-${userId}` },
					  ]
					: [{ type: "Todo", id: `LIST-${userId}` }],
		}),
		addTodo: builder.mutation<TodoData, Omit<TodoData, "id">>({
			query: (body) => ({
				url: "/todos",
				method: "POST",
				body,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				let maxId = 0;

				const patchResultAllTodos = dispatch(
					apiSlice.util.updateQueryData(
						"getAllTodos",
						undefined,
						(draft) => {
							if (draft.length > 0) {
								maxId = draft[draft.length - 1].id;
							}
							const newTodo = { ...arg, id: maxId + 1 };
							draft.push(newTodo);
						}
					)
				);

				const patchResultUserTodos = dispatch(
					apiSlice.util.updateQueryData(
						"getUserTodos",
						arg.userId,
						(draft) => {
							if (draft.length > 0) {
								const maxUserId = Math.max(
									...draft.map((todo) => todo.id)
								);
								maxId = Math.max(maxId, maxUserId);
							}
							const newTodo = { ...arg, id: maxId + 1 };
							draft.push(newTodo);
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					patchResultAllTodos.undo();
					patchResultUserTodos.undo();
				}
			},
		}),
		updateTodo: builder.mutation<TodoData, Partial<TodoData>>({
			query: ({ id, ...patch }) => ({
				url: `/todos/${id}`,
				method: "PUT",
				body: patch,
			}),
			async onQueryStarted(updatedTodo, { dispatch, queryFulfilled }) {
				const patchResultAllTodos = dispatch(
					apiSlice.util.updateQueryData(
						"getAllTodos",
						undefined,
						(draft) => {
							const todo = draft.find(
								(t) => t.id === updatedTodo.id
							);
							if (todo) {
								Object.assign(todo, updatedTodo);
							}
						}
					)
				);

				const patchResultUserTodos = dispatch(
					apiSlice.util.updateQueryData(
						"getUserTodos",
						updatedTodo.userId!,
						(draft) => {
							const todo = draft.find(
								(t) => t.id === updatedTodo.id
							);
							if (todo) {
								Object.assign(todo, updatedTodo);
							}
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					patchResultAllTodos.undo();
					patchResultUserTodos.undo();
				}
			},
		}),
		deleteTodo: builder.mutation<
			{ success: boolean; id: number },
			{ id: number; userId: number }
		>({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: "DELETE",
			}),
			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				const userId = data?.userId;

				const patchResultAllTodos = dispatch(
					apiSlice.util.updateQueryData(
						"getAllTodos",
						undefined,
						(draft) => {
							const index = draft.findIndex(
								(todo) => todo.id === data.id
							);
							if (index !== -1) {
								draft.splice(index, 1);
								console.log(
									`Removed todo with id ${data.id} from allTodos`
								);
							}
						}
					)
				);

				// Optimistically update the cache for `getUserTodos` if userId is available
				let patchResultUserTodos;
				if (userId !== undefined) {
					patchResultUserTodos = dispatch(
						apiSlice.util.updateQueryData(
							"getUserTodos",
							userId,
							(draft) => {
								const index = draft.findIndex(
									(todo) => todo.id === data.id
								);
								if (index !== -1) {
									draft.splice(index, 1);
									console.log(
										`Removed todo with id ${data.id} from userTodos with userId ${userId}`
									);
								}
							}
						)
					);
				} else {
					console.warn(
						`UserId not found for todo with id ${data.id}`
					);
				}

				try {
					await queryFulfilled;
				} catch {
					// Roll back updates on failure
					patchResultAllTodos.undo();
					if (patchResultUserTodos) patchResultUserTodos.undo();
					console.error(
						`Failed to delete todo with id ${data.id}, rolled back updates`
					);
				}
			},
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetAllTodosQuery,
	useGetUserTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = apiSlice;
