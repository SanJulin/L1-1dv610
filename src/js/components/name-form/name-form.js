/* eslint-disable jsdoc/require-description */
const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <div>
        <h3>Pls enter your name and click on show!</h3>
        <form>
            <input type="text" id="name" name="name">
            <button type="submit">Show ...</button>
        </form>
    </div>
`
customElements.define('name-form',
  /**
   *
   */
  class extends HTMLElement {
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  })
