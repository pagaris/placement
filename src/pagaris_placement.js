const baseUrl = 'https://pagaris.com/placement?'

class PagarisPlacement extends HTMLElement {
  static get observedAttributes() {
    return ['amount', 'ref']
  }

  setShadowDom() {
    // Event handling in `connectedCallback()` will make it visible.
    this.style.visibility = 'hidden'

    this._amount = this.getAttribute('amount')
    this._ref = this.getAttribute('ref')

    let params = {
      utm_medium: 'placement',
      utm_campaign: 'placement',
      utm_source: window.location.href
    }
    if (this._amount) params.amount = this._amount
    if (this._ref) params.ref = this._ref
    params = new URLSearchParams(params)
    const url = baseUrl + params.toString()

    fetch(url).then(response => response.text()).then(html => {
      // Insert HTML response to Shadow DOM
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' })
      shadow.innerHTML = ''
      shadow.append(doc.querySelector('html'))

      // (Re)insert scripts to Shadow DOM, so that they are evaluated
      const scriptsSelector = 'script[src], script[data-insert-to-shadow]'
      shadow.querySelectorAll(scriptsSelector).forEach((item, i) => {
        const script = document.createElement('script')
        if (item.src) script.src = item.src
        if (item.innerHTML.length) script.innerHTML = item.innerHTML
        shadow.querySelector('head').appendChild(script)
      })

      // Fix modal: Trigger an event when toggling button is clicked, which
      // will be catched in source (Pagaris).
      const button = shadow.querySelector('button[data-toggle=modal]')
      if (button) {
        button.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('placementButtonClick', {
            detail: {shadow}
          }))

          // Move backrop to shadow root instead of parent DOM
          const backdrop = document.querySelector('body > .modal-backdrop')
          if (backdrop) {
            backdrop.parentNode.removeChild(backdrop)
            shadow.appendChild(backdrop)
          }

          // Remove .modal-open from parent body and add to shadow body
          const body = document.querySelector('body.modal-open')
          if (body) {
            body.classList.remove('modal-open')
            shadow.querySelector('body')?.classList.add('modal-open')
          }
        })
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._amount == undefined) return // called before connectedCallback()
    this.setShadowDom()
  }

  connectedCallback() {
    document.addEventListener('placementLoaded', () => {
      setTimeout(() => { this.style.visibility = 'visible' }, 300)
    })

    this.setShadowDom()
  }

  get amount() {
    return this.getAttribute('amount')
  }

  set amount(val) {
    return this.setAttribute('amount', val)
  }

  get ref() {
    return this.getAttribute('ref')
  }

  set ref(val) {
    return this.setAttribute('ref', val)
  }
}

window.customElements.define('pagaris-placement', PagarisPlacement)
