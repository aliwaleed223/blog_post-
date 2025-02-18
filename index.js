//https://bloop-bloop-blog.onrender.com/

import express from "express";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Serve static files from the 'public' directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var filePath = "";
app.locals.title = ["Deep Work: Rules for Focused Success "];
app.locals.essay = ["Deep Work: Rules for Focused Success in a Distracted World by Cal Newport is a guide on how to achieve deep work, which Newport defines as professional activities performed in a state of distraction-free concentration that push cognitive capabilities to their limit. The book contrasts deep work with shallow work, which is non-cognitively demanding tasks often performed while distracted. Key Points The Importance of Deep Work: Deep work is valuable in today's economy because it allows individuals to quickly master hard things and produce high-quality work in less time. Newport argues that deep work is increasingly rare due to the constant distractions of modern life, particularly digital distractions. The Benefits of Deep Work: Enhanced productivity and efficiency. Greater job satisfaction and fulfillment. Improved ability to learn complex skills and solve problems. The Rules for Deep Work: Work Deeply: Develop habits and routines to minimize shallow work and maximize deep work. Embrace Boredom: Train your brain to resist distraction and remain focused. Quit Social Media: Be selective about the technologies and platforms you use. Drain the Shallows: Reduce or eliminate time spent on less important tasks "];
app.locals.date = [];
app.locals.idxOf = 0;


function takeTitleAndEssay(req, res, next) {
  filePath = req.body.filePath;

  if (req.path === '/essay') {
    // Find the index of the title and essay in the array
    app.locals.idxOf = app.locals.title.indexOf(req.body.title);
    return next();
  }

  if (req.path === '/ed') {
    // Edit element
    app.locals.title[app.locals.idxOf] = req.body.title;
    app.locals.essay[app.locals.idxOf] = req.body.essay;
    return next();
  }

  if (filePath === "/delete") {
    // Delete specific element
    app.locals.title.splice(app.locals.idxOf, 1);
    app.locals.essay.splice(app.locals.idxOf, 1);
    app.locals.date.splice(app.locals.idxOf,1);

    return next();
  }

  if (req.body.title && req.body.essay) {
    // Create post
    const date = new Date();
    app.locals.date.push(date);
    app.locals.title.push(req.body.title);
    app.locals.essay.push(req.body.essay);
  }
  next();
}

app.use(takeTitleAndEssay);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/creat", (req, res) => {
  res.render("c_post");
});

app.post("/edit", (req, res) => {
  res.render("edit");
});

app.post("/submit", (req, res) => {
  res.render("index");
});

app.post("/ed", (req, res) => {
  res.render("index");
});

app.post("/essay", (req, res) => {
  res.render("essay");
});

app.listen(process.env.PORT ||port, () => {
  console.log(`Listening on port ${port}`);
});


