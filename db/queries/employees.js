// db/queries/employees.js
import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, birthday, salary];
  const res = await db.query(sql, values);
  return res.rows[0]; // returns created employee
}

/** @returns all employees */
export async function getEmployees() {
  const sql = `SELECT * FROM employees ORDER BY id;`;
  const res = await db.query(sql);
  return res.rows;
}

/**
 * @returns the employee with the given id
 * @returns null if not found
 */
export async function getEmployee(id) {
  const sql = `SELECT * FROM employees WHERE id = $1;`;
  const res = await db.query(sql, [id]);
  return res.rows[0] || null;
}

/**
 * @returns the updated employee
 * @returns undefined if employee not found
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
    UPDATE employees
    SET name = $1, birthday = $2, salary = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [name, birthday, salary, id];
  const res = await db.query(sql, values);
  return res.rows[0]; // undefined if not found
}

/**
 * @returns the deleted employee
 * @returns undefined if employee not found
 */
export async function deleteEmployee(id) {
  const sql = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
  `;
  const res = await db.query(sql, [id]);
  return res.rows[0]; // undefined if not found
}
