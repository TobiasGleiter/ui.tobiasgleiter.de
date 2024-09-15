class AccordionBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    const groupName = this.getAttribute('name');
    const detailsElement = this.shadowRoot.querySelector('details');
    detailsElement.addEventListener('toggle', () => {
      if (detailsElement.open) {
        this.collapseOtherAccordions(groupName);
      }
    });
  }

  collapseOtherAccordions(groupName) {
    const allAccordions = document.querySelectorAll(`accordion--base[name="${groupName}"]`);

    allAccordions.forEach((accordion) => {
      if (accordion !== this) {
        const details = accordion.shadowRoot.querySelector('details');
        if (details.open) {
          details.open = false;
        }
      }
    });
  }

  render() {
    const groupName = this.getAttribute('name');

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/accordion.css" />

        <details class="accordion">
          <summary class="accordion__summary"><slot name="summary"></slot></summary>
          <p class="accordion__content"><slot name="content"></slot></p>
        </details>
    `;
  }
}

customElements.define('accordion--base', AccordionBase);