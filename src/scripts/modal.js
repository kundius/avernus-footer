const isVisible = (elem) =>
  !!elem &&
  !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

const modalToggles = document.querySelectorAll("[data-shft-modal-toggle]");
if (modalToggles.length) {
  modalToggles.forEach((toggle) => {
    let modal = document.querySelector(toggle.dataset.shftModalToggle);
    let close = modal.querySelector("[data-shft-modal-close]");
    const outsideClickListener = (event) => {
      if (
        !modal.contains(event.target) &&
        isVisible(modal) &&
        !toggle.contains(event.target)
      ) {
        hide();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };
    const show = () => {
      modal.classList.add("_opened");
      document.addEventListener("click", outsideClickListener);
    };
    const hide = () => {
      modal.classList.remove("_opened");
    };
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      show();
    });
    close.addEventListener("click", (e) => {
      e.preventDefault();
      hide();
    });
  });
}
