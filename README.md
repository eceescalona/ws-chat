## Assignment 2 - Devek.ai
# Objective
Develop a simple real-time chat application using WebSockets. The app should allow users to
join a chat room and send messages in real-time. The purpose of this assignment is to assess
your ability to build a full-stack application with real-time communication, structure a project
efficiently, and implement best coding practices.
# Tech Stack (Requirements & Recommendations)
● Must Use: WebSockets infrastructure
● Recommended: Bun (optional) for both backend and frontend, ShadCN/MUI for the
frontend
● Frontend: React with TypeScript
● Backend & Database: Any technology of your choice that fits the project
# Requirements
1. Backend (WebSocket Server)
● Set up a WebSocket server that enables users to join a chat room.
● Handle user connections, disconnections, and message broadcasting.
● Store chat messages persistently.
● Implement basic authentication to identify users.
● Provide an API for retrieving previous chat messages.
2. Frontend (React + TypeScript)
● Develop a simple UI with:
○ An input field for the username.
○ A text box for messages.
○ A chat window that updates in real-time as messages arrive.
● Handle real-time WebSocket events (new messages, user connections/disconnections).
● Display an indicator when another user is typing (optional bonus feature).
● Ensure a clean and intuitive user interface.
3. Deployment & Documentation
● Provide clear instructions on setting up and running the project locally.
● Include a README.md with:
○ Setup guide.

## How to run the app?
On the main folder of the proyect use:
yarn install
yarn run dev or yarn run start

○ Explanation of the architecture and design choices.

Simple client-server architecture, the proyect is divide on 3 main folders (client, common and server).
Use of common as package to share features between the client and the server. In boths, server and client all components are separate on individual files organize on folders. 

○ A list of additional features (if any) implemented beyond the base requirements.

Use of jwswebtoken for authentication propose.

● (Bonus) Dockerize the application for simplified deployment. (YES)
# Evaluation Criteria
● Code Quality: Clean, modular, and well-structured code.
● Real-time Functionality: Efficient WebSocket implementation.
● Scalability: Considerations for handling multiple users.
● Error Handling: Proper validation and meaningful error responses.
● Documentation: Clear setup instructions and explanations.
● Bonus: Additional features like typing indicators, user presence tracking, and Docker
setup.
#Submission Guidelines
● Submit your code via a GitHub repository link.
● Include a short video or GIF demonstrating the functionality.
● Provide any additional notes on improvements you would make in a production
environment.
Please provide your submission to roy@devek.ai by February 28, 2025.
