export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = "",
    link = "",
    value = "",
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.element = this.createElement(this.createTemplate());
    this.toggleLoaderStatus();
  }

  createElement(html) {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.firstElementChild;
  }

  createLinkTemplate() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : "";
  }

  toggleLoaderStatus() {
    const isDataEmpty = this.data.length === 0;
    
    this.element.classList.toggle('column-chart_loading', isDataEmpty);
  }

  createTemplate() {
    return `<div class="column-chart" style="--chart-height: ${this.chartHeight}">
              <div class="column-chart__title">
                Total ${this.label} ${this.createLinkTemplate()}
              </div>
              <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart">${this.createBodyTemplate()}</div>
              </div>
			      </div>`;
  }

  createBodyTemplate() {
    const maxValue = Math.max(...this.data);

    return this.data
      .map((item) => {
        const value = Math.floor(item * (this.chartHeight / maxValue)).toFixed();
        const percent = ((item / maxValue) * 100).toFixed() + "%";

        return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
      })
      .join("");
  }

  update(data) {
    this.data = data;
    const columnChartBody = this.element.querySelector('[data-element="body"]');

    columnChartBody.innerHTML = this.createBodyTemplate();

    this.toggleLoaderStatus();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
