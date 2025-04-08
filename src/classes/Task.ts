import { TaskHelper } from "./TaskHelper";


export class Task {
  public execute: Function
  constructor(action: (helper: TaskHelper) => Promise<any>) {
    this.execute = (helper: TaskHelper) => new Promise((resolve, reject) => {
      try {
        resolve(action(helper))
      } catch (error) {
        reject(error)
      }
    })
  }
}