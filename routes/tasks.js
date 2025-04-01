const express = require('express');
const Task = require('../models/Tasks');
const router = express.Router();
const { authMiddleware } = require("../middleware");

// 📌 Create Task (POST /tasks)
router.post('/tasks', authMiddleware, async (req, res) => {
    try {
        const task = new Task({ ...req.body, createdBy: req.user.userId });

        await task.save();
        res.status(201).json({ success: true, task });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// 📌 Get All Tasks (GET /tasks?status=Completed&priority=High)
router.get('/tasks', authMiddleware, async (req, res) => {
    try {
        const filters = { createdBy: req.user.userId };
        if (req.query.status) filters.status = req.query.status;
        if (req.query.priority) filters.priority = req.query.priority;

        const tasks = await Task.find(filters);
        res.status(200).json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 📌 Get Single Task (GET /tasks/:id)
router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });

        res.status(200).json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 📌 Update Task (PUT /tasks/:id)
router.put('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });

        res.status(200).json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 📌 Delete Task (DELETE /tasks/:id)
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });

        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
