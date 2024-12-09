# CS260
Web development

## Poetry Portfolio Elevator Pitch

I am an English major, and many of my friends are also English majors, which has led me to the realization that most of my English-major friends do not understand technology. As slightly techno-phobic individuals, publishing and storing things they create online can be overwhelming or scary. This web application would fill a presently empty space for people to upload their own poetry to a public platform, sorted by user, simply built for easy access, easy contribution, and easy storage. Another aspect of this web app would include the option to search other people's poetry either by their tag or their profile. It could be useful in poetry classes at universities or high schools for teachers and students to read each other's works easily. 

## Poetry Portfolio Key Features

### **Sign in/login:** 
- [ ] *HTML* will structure the login page and sign-up page 
- [ ] *CSS* will style the form
- [ ] *Javascript* will handle the submission and validation
- [ ] I'll need a database to keep track of the users. (Maybe this database would be created with *SQL*.)

### **Voting/liking poems:** 
- [ ] *HTML* will be used for voting on a poem to create a like button at the end of a poem
- [ ] *CSS* would style it 
- [ ] *JavaScript/React* would handle the user interactions with the button and update the UI to reflect the current number of likes. 

### **Showing popular poems/sorting poems by tags:** 
- [ ] *HTML* would create the basic layout for displaying poems and filtering options. 
- [ ] *CSS* would style the poem listings, filters, and popular poem section. 
- [ ] *JavaScript* would fetch and display poems from the backend, handle filtering by tags, and sort poems based on popularity. 

## Poetry Portfolio Front Page Sketch
![Front Page sketch](PPSketch.png)

## Poetry Portfolio Poem on Page Sketch
![Poem Page Sketch](PoemSketch.png)
This is very rough, and I will be brainstorming how to make it prettier. I was thinking if you clicked on the person's username it would take you to a collection of their stuff. They'd have the option to organize it and put it into folders, or they could just have all of their poems be buttons.

## HTML Deliverable
For this deliverable, I built out the structure of my website using HTML.
- [x] **HTML pages** - Eight HTML pages that represent the ability to login, search, view a profile, view folders (4), and learn about the site. 
- [x] **Links** - The login page automatically links to the search page. The search page contains links to the about page and to your profile, which contains links to the folders.
- [x] **Text** - There is quite a bit of text. For example, on the login page, I included quotes from famous poets about why poetry is important.
- [X] **Images** - I included 6 images of poets on the login page. I think it could also be cool to have profile pictures on the profile page, but I'm not sure how to do that.
- [x] **DB/Login** - Input box and submit button for login. 
- [x] **WebSocket** - The count of likes a poem gets from certified accounts represents the tally of realtime votes.

## CSS Deliverable
For this deliverable, I made all of my website's HTML pretty using CSS. This is what I did specifically:
- [x] **Flex** - I used CSS flex to make sure my website adjusts to different window sizes, ensuring that buttons, folders, and all content are visible regardless of the size of the screen. Every page is responsive to window resizing
- [x] **Headers and footers** - I included properly styled CSS headers, footers, and main content body on all pages where it was appropriate. I also adjusted the header to not include whatever page the user was on.
- [x] **Styled navigation buttons** - I also included properly styled CSS navigation elements. One button I am particularly proud of (that probably took way too long to execute) is the button on the post poem page. Take a look if you so desire. All other buttons turn a different shade when hovered over and adjust positions depending on the window size.
- [x] **Properly styled elements** - On my front page, I have a bar that fades from blue to green on a gradient. Additionally, the main h1 header on the front page turns blue when you hover over it. There are quite a few fun little uses of active CSS on my website.
- [x] **Text content** - My website is a poetry sharing platform, so there is a lot of text that I had to style. There are a couple of different spots where I used CSS to style editable textboxes (bio section on the profile page and the poem submission page). I also had to use CSS to style the main poems themselves.
- [x] **Images** - I used properly styled CSS application images on the front page. I thought it would be cool to have pictures of accomplished poets and what they've said about poetry. So, I used CSS to make it so when you hover over the images, it changed to a grey overlay with the quote in white.

## React Deliverable
- [x] **Simon React** deployed into production environment.
- [x] **Github link** Link to GitHub startup repository prominently displayed on application's home page.
- [x] **Vite**
- [x] Created a React component structure with the main App component and separate components for Login, CreateAccountPopup, About, Profile, Search, and PhotoGallery.
- [x] Integrated react-router-dom with <BrowserRouter>, <NavLink>, and <Routes> for page navigation and route management.
- [x] Added state variables (userName, authState, showLogin, showCreateAccount) to manage login status and toggle popups.
- [x] Used useState for managing component states and conditional rendering of login/account popups.
- [x] Created custom functions (showLoginPopup, showCreateAccountPopup, hidePopups) to show/hide popups and handle form submissions and added handleAuthChange to update the authentication state and userName.
- [x] Integrated AuthState to control the user’s authentication state.
- [x] Conditionally displayed Login and Create Account popups based on state.
- [x] Extracted <PhotoGallery /> into its own component to manage the photo gallery layout and content.
- [x] Moved quotes and images from the HTML to separate image imports for React usage (EmilyImage, HeaneyImage, etc.).
- [x] Used <></> (React Fragments) to group popup overlay and content without adding extra DOM elements.
- [x] Replaced static content with dynamic routing and navigation links (<NavLink>) for Search, Profile, and About pages.

## Startup Service
- [x] **Simon React** deployed into production environment.
- [x] **Github link** Link to GitHub startup repository prominently displayed on application's home page.
- [x] **Vite**
- [x] Created an HTTP service using Node.js and Express
- [x] This deliverable is a basic Node.js application using the Express framework to provide a simple backend API for user authentication and management. The server handles user registration, login, logout, and retrieval of user information, all stored in-memory. It also serves static frontend content and a fallback default page.
- [x] Frontend serves up using Express static middleware.
- [x] Frontend calls third party service endpoints.
- [x] Backend provides service endpoints
- [x] Frontend calls service endpoints.
- [x] Currently, the create account api is working. The login is nearly there.
- [x] Also, the user data is stored in memory and will be lost when the server restarts. This will change in future deliverables when I add a database. 

## Websocket Deliverable 가즈아아아아!!!
- [x] Backend listens for WebSocket connection
- [x] Frontend makes WebSocket connection
- [x] Data sent over WebSocket connection
- [x] WebSocket data displayed in the application interface
- [x] Application is fully functional

This code sets up a WebSocket server in Node.js using the `ws` library and provides real-time communication between clients. Below is an explanation of its functionality:

1. **Creating the WebSocket Server**:
   - A WebSocket server is created using the `WebSocketServer` class from the `ws` library, which listens for HTTP connections that are upgraded to WebSocket connections.

2. **Handling the HTTP Upgrade**:
   - The `httpServer.on('upgrade')` event is triggered when an HTTP request is made to the server. It allows the protocol to be upgraded from HTTP to WebSocket, facilitating bidirectional communication between the client and server.

3. **Managing WebSocket Connections**:
   - Once a WebSocket connection is established, the server creates a new connection object, assigning it a unique ID using the `uuid.v4()` function. This connection object is stored in the `connections` array.
   - The server listens for messages from clients using the `message` event and forwards the received message to all other connected clients, except the sender.

4. **Handling Connection Closure**:
   - When a WebSocket connection is closed (e.g., the client disconnects), the server removes the connection from the `connections` array, preventing messages from being sent to the closed WebSocket.

5. **Ping/Pong Mechanism**:
   - The WebSocket server implements a ping/pong mechanism to keep connections alive. The server sends a ping message to each client periodically. If a client fails to respond with a pong message, the server considers the connection inactive and terminates it.

6. **Automatically Terminating Inactive Connections**:
   - Every 10 seconds, the server checks if each connection is still alive. If a connection hasn’t responded to the previous ping, it is terminated. Otherwise, the server marks it as alive and sends another ping.

This WebSocket server facilitates real-time message exchange between connected clients and ensures that inactive connections are removed to optimize resources.
