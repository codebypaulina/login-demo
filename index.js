const express = require("express");
const app = express();

// styling with express.static() middleware to serve static files
app.use(express.static("public"));

/********** task: GET / **********/
app.get("/", (req, res) => {
  res.send(`
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <h1>Welcome back, user 😻</h1>
    
    <footer>
      <p>
        <a href="/login">Login</a> | 
        <a href="/my-account">My Account</a>
      </p>
    </footer>`);
});

// Server "lauscht" auf Port 3000
app.listen(3000, () => {
  console.log("server runs on http://localhost:3000");
});

/********** task: GET /echo/:message **********/
app.get("/echo/:message", (req, res) => {
  const message = req.params.message;

  if (message === "secret") {
    res.send("<h1>The secret is... 42! 🤫</h1>");
  } else {
    res.send(message);
  }
});

/********** task: GET /login **********/
app.get("/login", (req, res) => {
  res.send(`
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <h1>Login</h1>
    <form action="/login" method="POST">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required /> <br/><br/>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required /> <br/><br/><br/>
      <button type="submit">Login</button>
    </form>`);
});

// Middleware, um Auslesen von Formulardaten zu ermöglichen
app.use(express.urlencoded({ extended: true }));

/********** task: POST /login **********/
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false });
  }

  if (email === "user@email.com" && password === "very-secret") {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

/********** task: GET /my-account **********/
app.get("/my-account", (req, res) => {
  res.send(`
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <h1>My Account</h1>
    <p>Settings:</p>`);
});

/********** task: GET /error **********/
app.get("/error", (req, res) => {
  res.send(`
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <h1>Error</h1>
    <p>Something went wrong with your request... 💩</p>`);
});
