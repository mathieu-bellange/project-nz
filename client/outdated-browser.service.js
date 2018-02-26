export default class OutdatedBrowserService {
  isOutdated() {
    return !!document.documentMode;
  }
}
