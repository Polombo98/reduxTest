import { FC } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type LogoutModalProps = {
	show: boolean;
	handleClose: () => void;
	handleLogout: () => void;
};

const LogoutModal: FC<LogoutModalProps> = ({
	show,
	handleClose,
	handleLogout,
}) => {
	return (
		<Modal show={show} onHide={handleClose} data-testid="logout-modal">
			<Modal.Header closeButton>
				<Modal.Title>Logout</Modal.Title>
			</Modal.Header>
			<Modal.Body>Do you want to logout?</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleLogout}>
					Logout
				</Button>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LogoutModal;
