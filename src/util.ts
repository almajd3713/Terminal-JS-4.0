import { ElementTypes, MessageTypes, CreateNodeProps } from "./types"

export const util = {
createNode(props: CreateNodeProps): HTMLElement {
  let node = document.createElement(props.tag || "div")
  if (props.className) {
    if (Array.isArray(props.className)) props.className.forEach(classN => node.classList.add(classN))
    else node.className = props.className
  }
  if (props.id) { node.setAttribute("id", props.id) }
  if (props.src) { node.setAttribute("src", props.src) }
  if (props.attributes) {
    props.attributes.forEach(attr => {
      node.setAttribute(attr[0], attr[1])
    })
  }
  if (props.textContent) { node.innerHTML = props.textContent }
  if (props.subNodes) {
    if (props.subNodes instanceof HTMLElement) node.appendChild(props.subNodes)
    else if (Array.isArray(props.subNodes)) props.subNodes.forEach(subNode => {
      if (subNode instanceof HTMLElement) node.appendChild(subNode)
      else node.appendChild(util.createNode(subNode))
    }); else node.appendChild(util.createNode(props.subNodes))
  }
  if(props.style) for(let prop in props.style) {
    // @ts-ignore
    node.style[prop] = props.style[prop]
  }
  if (props.onClick) node.onclick = props.onClick
  return node
},

defaultStyleGen: (id:string) => util.createNode({tag: "style", textContent: `
      #${id} {
        box-sizing: border-box;
        width: 100%;
        min-height: 100%;
        padding: 1rem;
        color: #109e2a;
        background-color: black;
        font-size: 1.5rem;
        font-family: monospace;
      }

      #${id} p, #container form {
        margin: 0;
        margin-bottom: 0.5rem
      }

      #${id} input {
        background-color: inherit;
        width: 50%;
        outline: none;
        border: none;
        font-size: inherit;
        color: inherit;
        font-family: inherit;
        margin-left: 1rem;
      }
      #${id} input.isFocused {
        border-bottom: 1px solid #109e2a
      }
    `,
    attributes: [["data-terminal-style", "true"]]
}),

genElement(type: ElementTypes, props: CreateNodeProps, messageType: MessageTypes = "default") {
  switch (type) {
    case "print":
      return util.createNode({ tag: "p", textContent: props.textContent, style: {
        backgroundColor: 
          messageType === "error" ? "#d90d0d" :
          messageType === "warning" ? "#ced416" :
          "initial",
        color:
          messageType !== "default" ? "black" :
          "inheret"
      }})
    case "input":
      return util.createNode({
        tag: "form",
        subNodes: {
          tag: "p",
          textContent: props.textContent,
          subNodes: {
            tag: "input",
            attributes: [["type", "text"]]
          }
        }
      })
  }
},
}