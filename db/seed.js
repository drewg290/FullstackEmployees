import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 12; i++) {
    const employee = {
      name: "employee",
      birthday: faker.date.past({ years: 40 }),
      salary: faker.number.int({ min: 50000, max: 120000 }),
    };
    await createEmployee(employee);
  }
}
