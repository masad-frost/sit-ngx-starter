function bootloader(main) {
  if (document.readyState === 'complete') {
    main()
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

function noop() {}

module.exports = {
  hmrModule: noop,
  removeNgStyles: noop,
  createNewHosts: noop,
  createInputTransfer: noop,
  getInputValues: noop,
  setInputValues: noop,
  bootloader: bootloader
};
