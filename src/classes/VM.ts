import { TaskList } from "../types";
import { Task } from "./Task";
import { TaskHelper } from "./TaskHelper.js";
import { TerminalUI } from "./TerminalUI";


export class VM {
  private ui: TerminalUI
  private helper: TaskHelper
  private tasks: TaskList = {}
  private isExecuting: boolean = false
  constructor(ui: TerminalUI) {
    this.helper = new TaskHelper(ui)
  }

  public addTask(name: string, description: string, task: Task) {
    this.tasks[name] = {
      description,
      action: task,
    };
  }

  public addTasks(tasks: TaskList) {
    for (const name in tasks) {
      this.addTask(name, tasks[name].description || "", tasks[name].action);
    }
  }

  public removeTask(name: string) {
    delete this.tasks[name];
  }

  public executeTask(name: string) {
    if (this.isExecuting) {
      console.warn("Another task is already executing. Please wait.");
      return;
    }
    this.isExecuting = true;
    const task = this.tasks[name];
    if (!task) {
      throw new Error(`Task "${name}" not found.`);
    }
    try {
      task.action.execute(this.helper);
    } catch (error) {
      console.error(`Error executing task "${name}":`, error);
    }
    this.isExecuting = false;
  }
}