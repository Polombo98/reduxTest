import { FC, useState } from "react";
import { createPortal } from "react-dom";
import logo from "../../assets/logo.svg";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import AuthButton from "../authButton";
import LoginModal from "../loginModal";
import LogoutModal from "../logoutModal";
import { Link } from "react-router-dom";

type HeaderProps = {
	isAuthorized?: boolean;
};

const Header: FC<HeaderProps> = ({ isAuthorized }) => {
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

	const toggleLogin = () =>
		setIsLoginModalVisible((loginModalVisibility) => !loginModalVisibility);
	const toggleLogout = () =>
		setIsLogoutModalVisible(
			(logoutModalVisibility) => !logoutModalVisibility
		);

	return (
		<>
			<header className={styles.header} data-testid="header">
				<Container>
					<Row
						className={`${styles.headerRow} justify-content-xs-center justify-content-between`}
					>
						<Col
							xs={{ span: 4, offset: 4 }}
							md={{ offset: 0, span: 1 }}
							className={`align-items-center`}
						>
							<Row>
								<Col
									xs={12}
									md={6}
									className={styles.logoWrapper}
								>
									<Link
										to=""
										className={`align-items-center d-flex`}
									>
										<img
											src={logo}
											className={styles.logo}
											alt="logo"
										/>
									</Link>
								</Col>
								<Col
									xs={12}
									md={6}
									className={styles.textWrapper}
								>
									<b className={styles.headerText}>
										TODO APP
									</b>
								</Col>
							</Row>
						</Col>
						<Col xs="auto">
							<AuthButton
								isAuthorized={isAuthorized}
								handleLogin={toggleLogin}
								handleLogout={toggleLogout}
							/>
						</Col>
					</Row>
				</Container>
			</header>

			{!isAuthorized
				? createPortal(
						<LoginModal
							show={isLoginModalVisible}
							handleClose={toggleLogin}
						/>,
						document.body
				  )
				: createPortal(
						<LogoutModal
							show={isLogoutModalVisible}
							handleClose={toggleLogout}
						/>,
						document.body
				  )}
		</>
	);
};

export default Header;
