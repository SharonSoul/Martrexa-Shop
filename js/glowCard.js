console.clear();

const caardsContainer = document.querySelector(".caards");
const caardsContainerInner = document.querySelector(".caards__inner");
const caards = Array.from(document.querySelectorAll(".caard"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - caardsContainer.offsetLeft;
  const y = e.pageY - caardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlaycaard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlaycaard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const caardIndex = caards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (caardIndex >= 0) {
      overlay.children[caardIndex].style.width = `${width}px`;
      overlay.children[caardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlaycaard = (caardEl) => {
  const overlaycaard = document.createElement("div");
  overlaycaard.classList.add("caard");
  createOverlayCta(overlaycaard, caardEl.lastElementChild);
  overlay.append(overlaycaard);
  observer.observe(caardEl);
};

caards.forEach(initOverlaycaard);
document.body.addEventListener("pointermove", applyOverlayMask);
