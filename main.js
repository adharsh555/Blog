import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "AI Agents in Everyday Apps: The 2025 Revolution",
    content:
      "AI agents are no longer limited to labs or enterprise software — they're now embedded in everyday tools. From virtual shopping assistants to intelligent calendar planners, 2025 has seen a surge in personalized, task-oriented AI. This post explores how these agents are reshaping user experiences and enabling smarter decision-making with minimal input.",
    author: "Jordan Riley",
    date: "2025-05-10T11:45:00Z",
  },
  {
    id: 2,
    title: "Quantum Computing Breakthroughs: What's Now Possible",
    content:
      "The race for quantum supremacy has entered a new chapter. With practical error correction now feasible, quantum computing has moved beyond experimentation into solving real-world problems like drug discovery and logistics optimization. We break down what this means for industries and the timeline to mainstream use.",
    author: "Leila Hassan",
    date: "2025-05-08T08:20:00Z",
  },
  {
    id: 3,
    title: "Remote Work 3.0: How Hybrid Culture Has Evolved",
    content:
      "Hybrid work in 2025 is smarter, more immersive, and driven by real-time data. With advancements in VR collaboration tools and AI-based productivity tracking, companies are rethinking performance, engagement, and even digital wellness. Here's what the latest workplace trends tell us about the future of work.",
    author: "Daniel Cruz",
    date: "2025-05-05T16:00:00Z",
  },
  {
    id: 4,
    title: "GreenTech Startups to Watch This Year",
    content:
      "As climate urgency grows, so does innovation in GreenTech. Startups in 2025 are leveraging AI, blockchain, and bioengineering to create solutions ranging from carbon capture to sustainable packaging. We've rounded up the most promising companies that are poised to make a real impact this year.",
    author: "Nina Kapoor",
    date: "2025-05-01T13:30:00Z",
  },
  {
    id: 5,
    title: "Is Web3 Making a Comeback?",
    content:
      "After the 2022–2023 slowdown, Web3 technologies are regaining momentum — but with more practicality and purpose. Instead of hype-driven NFTs, the focus is now on digital identity, decentralized social platforms, and creator royalties. This article explores the signs of a more mature Web3 ecosystem.",
    author: "Tyler Brennan",
    date: "2025-04-28T10:05:00Z",
  },
];


let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  console.log(posts);
  
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});
//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
