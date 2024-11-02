import { FC } from "react";
import WelcomeText from "./components/WelcomeText";
import { Container } from "react-bootstrap";

const Landing: FC = () => {
	return (
		<Container data-testid="landing-page">
			<WelcomeText />
		</Container>
	);
};

export default Landing;
