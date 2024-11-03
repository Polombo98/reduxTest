import TabsLayout from "./layouts/TabsLayout";
import Landing from "./pages/landing";
import { RouteObject } from "react-router-dom";
import MyTodo from "./pages/myTodo";
import Summary from "./pages/summary";

const tabs = [
	{ title: "My Todo", path: "/my-todo", element: <MyTodo /> },
	{ title: "Summary", path: "/summary", element: <Summary /> },
];

export const routes: RouteObject[] = [
	{
		path: "/landing",
		element: <Landing />,
	},
	{
		path: "/",
		element: (
			<TabsLayout
				tabs={tabs.map(({ path, title }) => ({ path, title }))}
			/>
		),
		children: tabs.map(({ element, path }) => ({ element, path })),
	},
];
