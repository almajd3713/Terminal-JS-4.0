import { TerminalUI } from "./classes/TerminalUI.js"

const target = document.getElementById("terminal-container") as HTMLDivElement

const ui: TerminalUI = new TerminalUI(target)

ui.print("Hello World")