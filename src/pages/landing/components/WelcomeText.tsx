import { FC } from "react";

import styles from "./index.module.css";

const WelcomeText: FC = () => {
	return (
		<div data-testid="welcome-text" className={styles.wrapper}>
			<p>
				Stay organized, boost your productivity, and accomplish more
				with TaskTrack, the intuitive todo app designed to help you
				manage your daily tasks effortlessly.
			</p>
			<h2>Get Started Instantly</h2>
			<ul>
				<li>
					Select Your User: Choose your username from our list of
					users to log in immediately—no lengthy sign-up process
					required.
				</li>
				<li>
					Personalized Experience: Access your own task list and start
					organizing right away.
				</li>
			</ul>

			<h3>How It Works</h3>
			<ol>
				<li>
					Pick Your User: <br />
					Press login button on header and on the login modal, select
					your user from the list of available items fetched from our
					backend.
				</li>
				<li>
					Explore the Dashboard: <br />
					Access your personalized dashboard featuring your current
					tasks.
				</li>
				<li>
					Manage Your Tasks: <br />
					Add new tasks, edit existing ones, or mark them as completed
					to stay organized.
				</li>
				<li>
					Need Guidance?: <br />
					Check out our short user guide below to make the most out of
					TaskTrack.
				</li>
			</ol>
			<h3>Short User Guide</h3>
			<ul>
				<li>
					Adding a Task: <br />
					Click the “Add Todo” button.
					<br />
					Enter the task details.
				</li>
				<li>
					Editing a Task: <br />
					Doubleclick on the description field and then edit the item.
					<br />
					Modify the details as needed and press enter to save your
					changes.
				</li>
				<li>
					Completing a Task: <br />
					Click the checkbox next to the task to mark it as completed.
				</li>
				<li>
					Deleting a Task: <br />
					Choose the task and click the button to remove it from your
					list.
				</li>
				<li>
					Switching Users: <br />
					Log out from the header and select a different username to
					switch accounts.
				</li>
			</ul>
		</div>
	);
};

export default WelcomeText;
