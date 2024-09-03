/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/require-description */
import '../name-form/index.js'

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '5D6v31k403IrIkO3mICgYRm5aezUwkAa'

const template = document.createElement('template')
template.innerHTML = `
    <style>
    #greeting {
    margin-top: 100px;
    margin-left: 100px;
    font-size: 40px;
    }
    #giphy {
    margin-top: 40px;
    margin-left: 100px;
    }
    </style>
    <div>
        <name-form></name-form>
    </div>
    <div id="greeting">
    </div>
    <div id="giphy">
    </div>
`

customElements.define('welcome-application',
  /**
   *
   */
  class extends HTMLElement {
    #name
    #greeting
    #nameForm
    #giphy
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#nameForm = this.shadowRoot.querySelector('name-form')

      this.#greeting = this.shadowRoot.querySelector('#greeting')

      this.#giphy = this.shadowRoot.querySelector('#giphy')
    }

    connectedCallback () {
      this.#nameForm.addEventListener('submit', (event) => {
        this.#name = event.detail
        console.log(this.#name)
        this.#showGreeting()
        this.#showGiphy()
      })
    }

    #showGreeting () {
      const greeting = `Hello ${this.#name}!`
      console.log(this.#name)
      this.#greeting.innerText = greeting
    }

    async #showGiphy () {
      this.#giphy.innerHTML = ''
      const response = await fetch(`${GIPHY_URL}?api_key=${API_KEY}&q=hello`)
      const data = await response.json()
      console.log(data)
      const randomGiphyIndex = Math.floor(Math.random() * data.data.length)
      const giphy = data.data[randomGiphyIndex]
      const img = document.createElement('img')
      img.src = giphy.images.fixed_height.url
      this.#giphy.appendChild(img)
    }
  }
)
