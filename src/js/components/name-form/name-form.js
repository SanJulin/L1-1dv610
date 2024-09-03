/**
 * The name-form web component module.
 */
const template = document.createElement('template')
template.innerHTML = `
    <style>
    p {
    font-size: 22px;
    margin-top: 60px;
    }
    form {
    margin-left: 100px;
    }
    input {
     font-size: 14px;
     padding: 8px;
     border-radius: 5px
    }
    button {
    font-size: 16px;
    padding: 5px 10px;
    margin-left: 10px;
    }
    #errorText {
    display: none;
    }
    </style>
    <div>
        <p>Pls enter your name and click on Hello to get your greeting!</>
        <form>
            <input type="text" id="name" name="name">
            <button type="submit">Hello</button>
        </form>
        <p id=errorText>Pls enter your name</p>
    </div>
`
customElements.define('name-form',
  /**
   * Class representing a form to enter a name
   */
  class extends HTMLElement {
    #form
    #inputField
    #name
    #errorText
    /**
     * Creates an instance of the NameForm class.
     */
    constructor () {
      super()

      // Attach a shadow root to the custom element and append the template to it
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Gets the input field, form and error text elements
      this.#inputField = this.shadowRoot.querySelector('#name')
      this.#form = this.shadowRoot.querySelector('form')
      this.#errorText = this.shadowRoot.querySelector('#errorText')
    }

    /**
     * Adds an event listener to the name form. If the form is submitted, the input field value is checked.
     */
    connectedCallback () {
      this.#form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.#name = this.#inputField.value
        this.#checkInput()
      })
    }

    /**
     * Checks if the input field is empty and displays an error message if it is. If the input field is not empty a submit event is dispatched with the input field value.
     */
    #checkInput () {
      if (this.#name.length < 1) {
        this.#errorText.style.display = 'block'
      } else {
        this.#errorText.style.display = 'none'
        this.dispatchEvent(new window.CustomEvent('submit', { detail: this.#inputField.value }))
        this.#inputField.value = ''
      }
    }
  }
)
