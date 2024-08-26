/* eslint-disable jsdoc/require-description */
import '../name-form/index.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <div>
        <h1></h1>
        <div>
        <name-form></name-form>
    </div>
`
customElements.define('welcome-application',
  /**
   *
   */
  class extends HTMLElement {
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelector('name-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const name = event.target.name.value
        this.shadowRoot.querySelector('h1').innerText = `Welcome, ${name}!`
      })
    }
  })

export default 'welcome-application'
