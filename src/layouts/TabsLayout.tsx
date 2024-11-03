import { FC } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

type TabType = {
	title: string;
	path: string;
};

type TabsLayoutProps = {
	tabs: TabType[];
};

const TabsLayout: FC<TabsLayoutProps> = ({ tabs }) => {
	return (
		<div>
			<Container className="d-flex justify-content-center">
				<Tab.Container defaultActiveKey={tabs[0].path}>
					<Nav>
						{tabs.map(({ title, path }) => {
							return (
								<Nav.Item key={path}>
									<Nav.Link
										eventKey={path}
										as={Link}
										to={path}
									>
										{title}
									</Nav.Link>
								</Nav.Item>
							);
						})}
					</Nav>
				</Tab.Container>
			</Container>
			<Tab.Content>
				<Outlet />
			</Tab.Content>
		</div>
	);
};

export default TabsLayout;
