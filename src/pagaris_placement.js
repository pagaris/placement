/**
 * Custom Element in charge of fetching pagaris.com/placement and dividing the
 * response into a modal and a link/button (in charge of opening the modal).
 */
class PagarisPlacement extends HTMLElement {
  static get observedAttributes() {
    return ['amount', 'ref', 'format', 'skip-modal']
  }

  setShadowDom() {
    const baseUrl = 'https://pagaris.com/placement?'

    // Event handling in `connectedCallback()` will make it visible.
    this.style.visibility = 'hidden'

    this._amount = this.getAttribute('amount')
    this._ref = this.getAttribute('ref')
    this._format = this.getAttribute('format')
    this._skipModal = this.hasAttribute('skip-modal')

    let params = {
      utm_medium: 'placement',
      utm_campaign: 'placement',
      utm_source: window.location.href
    }
    if (this._amount) params.amount = this._amount
    if (this._ref) params.ref = this._ref
    if (this._format) params.format = this._format
    if (this._skipModal) params.skip_modal = 'true'
    params = new URLSearchParams(params)
    const url = baseUrl + params.toString()

    fetch(url).then(response => response.text()).then(html => {
      // Insert HTML response to Shadow DOMs (from link and modal elements)
      const parser = new DOMParser()

      // Link document. Modal will be removed here and it will be applied to
      // this element's shadow DOM.
      const linkDoc = parser.parseFromString(html, 'text/html')

      let modalDoc, modalEl
      if (!this._skipModal) {
        const modal = linkDoc.querySelector('#details-modal')
        modal?.remove()

        // Modal doc. Link will be removed here and this document will be
        // applied to a pagaris-modal element that will be appended to body.
        modalDoc = parser.parseFromString(html, 'text/html')
        const link = modalDoc.querySelector('#modal-link')
        link?.remove()

        modalEl = document.createElement('pagaris-modal')
        document.body.appendChild(modalEl)
      }

      const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' })
      shadow.innerHTML = ''
      shadow.append(linkDoc.querySelector('html'))

      let modalShadow
      if (modalDoc) {
        modalShadow = modalEl.shadowRoot ||
          modalEl.attachShadow({ mode: 'open' })
        modalShadow.innerHTML = ''
        modalShadow.append(modalDoc.querySelector('html'))
      }

      // (Re)insert scripts to Shadow DOM, so that they are evaluated
      const scriptsSelector = 'script[src], script[data-insert-to-shadow]'
      const reinsertScripts = (shadow) => {
        shadow.querySelectorAll(scriptsSelector).forEach((item, i) => {
          const script = document.createElement('script')
          if (item.src) script.src = item.src
          if (item.innerHTML.length) script.innerHTML = item.innerHTML
          shadow.querySelector('head').appendChild(script)
        })
      }
      reinsertScripts(shadow)
      if (modalShadow) reinsertScripts(modalShadow)

      // Fix modal: Trigger an event when toggling button is clicked, which
      // will be catched in source (Pagaris).
      const button = shadow.querySelector('button[data-toggle=modal], a#modal-link')
      if (button && modalEl) {
        button.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('placementButtonClick', {
            detail: { shadow: modalShadow, ref: this._ref }
          }))

          // Move backrop to shadow root instead of parent DOM
          const backdrops = document.querySelectorAll('body > .modal-backdrop')
          if (backdrops.length) {
            backdrops.forEach(item => item.remove())

            modalShadow.appendChild(backdrops[0])
          }

          // Remove .modal-open from parent body and add to shadow body
          const body = document.querySelector('body.modal-open')
          if (body) {
            body.classList.remove('modal-open')
            modalShadow.querySelector('body')?.classList.add('modal-open')
          }
        })
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._connectedCallbackCalled == undefined) return
    this.setShadowDom()
  }

  connectedCallback() {
    document.addEventListener('placementLoaded', () => {
      setTimeout(() => { this.style.visibility = 'visible' }, 700)
    })

    this.setShadowDom()
    this._connectedCallbackCalled = true
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

  get format() {
    return this.getAttribute('format')
  }

  set format(val) {
    return this.setAttribute('format', val)
  }

  get skipModal() {
    return this.getAttribute('skip-modal')
  }

  set skipModal(val) {
    return this.setAttribute('skip-modal', val)
  }
}

window.customElements.define('pagaris-placement', PagarisPlacement)
