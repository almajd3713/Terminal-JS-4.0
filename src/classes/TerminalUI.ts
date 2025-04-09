import { MessageTypes } from '../types'
import { util } from '../util.js'

export class TerminalUI {
  private prefix = ">"
  constructor(private target: HTMLElement, prefix?: string) {
    if(prefix) this.prefix = prefix
    this.target.appendChild(util.defaultStyleGen(this.target.id))
  }

  async print(message: string, type?: MessageTypes) {
    let el = util.genElement('print', { textContent: message }, type)
    this.target.appendChild(el)
    el.scrollIntoView({ behavior: 'smooth' })
  }

  input(message:string, callback: (answer: string) => void, isCMD: boolean) {
    let el = util.genElement("input", {
      textContent: 
        `${message}${isCMD && this.prefix}`
    })
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
      if(!val || /\s/.test(val)){this.input(message, callback, isCMD); return}
      callback(val)
    })
  }
}