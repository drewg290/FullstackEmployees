// api/employees.js
import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

// GET /
router.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// GET /employees
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/employees", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body;
    if (!req.body || !name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/employees/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
router.delete("/employees/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/employees/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  const { name, birthday, salary } = req.body;

  if (!req.body || !name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
