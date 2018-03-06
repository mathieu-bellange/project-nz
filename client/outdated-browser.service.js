export default class OutdatedBrowserService {
  disableIE = !!document.documentMode;

  isOutdated() {
    return this.disableIE;
  }
}
