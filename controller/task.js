import Task from "../model/task.js";

export const newTask = async (req, res) => {
    const { title, description } = req.body;
    await Task.create({
        title, description, user: req.user
    })
    res.status(201).json({
        success: true,
        message: "Task added successfully"
    })
}

export const getMyTask = async (req, res) => {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        task,
    })
}

export const updateTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success: true,
        message: "Task updated"
    })
}

export const deleteTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted"
    })
}

