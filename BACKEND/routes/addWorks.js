const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const route = express();
const {sendTestEmail}=require("../controllers/email")

const workModel = require("../models/works");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext);
  },
});

const uploads = multer({ storage: storage });

/**
 * POST /add-post
 */
route.post("/add-post", uploads.single("image"), async (req, res) => {
  try {
    const { title, description, demoUrl, githubUrl, tags } = req.body;

    const newWork = new workModel({
      title,
      description,
      demoUrl: demoUrl || "#",
      githubUrl: githubUrl || "#",
      image: req.file ? req.file.filename : "",
      tags: tags ? tags.split(",") : []
    });

    await newWork.save();
    res.json({ status: true, message: "Project added", data: newWork });
  } catch (err) {
    res.status(500).json({ status: false, message: "Error adding project", error: err.message });
  }
});

/**
 * GET /get-posts
 */
route.get("/get-posts", async (req, res) => {
  try {
    const projects = await workModel.find().sort({ createdAt: -1 });
    res.json({ status: true, projects });
  } catch (err) {
    res.status(500).json({ status: false, message: "Error fetching projects" });
  }
});

/**
 * PUT /update-post/:id
 */
route.put("/update-post/:id", uploads.single("image"), async (req, res) => {
  try {
    const { title, description, demoUrl, githubUrl, tags } = req.body;

    const project = await workModel.findById(req.params.id);
    if (!project) return res.status(404).json({ status: false, message: "Project not found" });

    // Delete old image if new one is uploaded
    if (req.file && project.image) {
      fs.unlinkSync(path.join("uploads", project.image));
    }

    const updatedData = {
      title,
      description,
      demoUrl: demoUrl || "#",
      githubUrl: githubUrl || "#",
      image: req.file ? req.file.filename : project.image,
      tags: tags ? tags.split(",") : project.tags
    };

    const updated = await workModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ status: true, message: "Project updated", data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: "Error updating project", error: err.message });
  }
});

/**
 * DELETE /delete-post/:id
 */
route.delete("/delete-post/:id", async (req, res) => {
  try {
    const project = await workModel.findById(req.params.id);
    if (!project) return res.status(404).json({ status: false, message: "Project not found" });

    // Delete image
    if (project.image) {
      fs.unlinkSync(path.join("uploads", project.image));
    }

    await workModel.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Error deleting project", error: err.message });
  }
});

// POST /contact
route.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // 1. Send message to YOU
    const adminSubject = `📩 New message from ${name}`;
    const adminBody = `
      <h2>You have a new message!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `;

    await sendTestEmail(process.env.EMAIL_ID, adminSubject, adminBody);

    // 2. Send thank-you email to USER
    const userSubject = `Thanks for reaching out, ${name}! 👋`;
    const userBody = `
      <p>Hi ${name},</p>
      <p>Thank you for contacting me. I appreciate your message and will get back to you shortly.</p>
      <p>Let's connect soon!</p>
      <br>
      <p>Best regards,<br> Ashik Shaji</p>
    `;

    await sendTestEmail(email, userSubject, userBody);

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('❌ Error in contact route:', err);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
});


module.exports = route;