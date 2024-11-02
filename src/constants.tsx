import Landing from "./pages/landing";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Landing />,
	},
];
