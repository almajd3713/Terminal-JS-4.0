import { MessageTypes } from '../types'
import { util } from '../util.js'

export class TerminalUI {
  private prefix = "> "
  constructor(public target: HTMLElement, prefix?: string) {
    if(prefix) this.prefix = prefix
    this.target.appendChild(util.defaultStyleGen(this.target.id))
  }

  public print(message: string, type?: MessageTypes) {
    let el = util.genElement('print', { textContent: message }, type)
    this.target.appendChild(el)
    el.scrollIntoView({ behavior: 'smooth' })
  }

  input(message:string, callback: (answer: string) => void) {
    let el = util.genElement("input", {textContent: message})
    this.target.appendChild(el)
    el.scrollIntoView({behavior: "smooth"})
    let input = el.querySelector("input")!
    input.focus()
    input.classList.add("isFocused")
    el.addEventListener("submit", e => {
      e.preventDefault()
      input.disabled = true
      input.classList.remove("isFocused")
      let val = input.value
      if(!val || /\s/.test(val)){this.input(message, callback); return}
      callback(val)
    })
  }
}