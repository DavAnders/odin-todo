import { initializeUI } from "./domFunctions";
import "./style.css";

console.log("webpack is working");
const defaultProjects = [
  {
    id: 1,
    name: "Personal",
    todos: [
      {
        id: 101,
        title: "Grocery shopping",
        dueDate: "2024-04-20",
        priority: "medium",
      },
      {
        id: 102,
        title: "Renew gym membership",
        dueDate: "2024-04-25",
        priority: "low",
      },
    ],
  },
  {
    id: 2,
    name: "Work",
    todos: [
      {
        id: 201,
        title: "Project meeting",
        dueDate: "2024-04-18",
        priority: "high",
      },
      {
        id: 202,
        title: "Submit report",
        dueDate: "2024-04-22",
        priority: "medium",
      },
    ],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
});
