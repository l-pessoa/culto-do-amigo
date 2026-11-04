if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function mountInstallButton() {
  if (isStandalone()) return;
  const header = document.querySelector(".header-inner");
  if (!header || document.getElementById("install-btn")) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "install-btn";
  btn.className = "install-btn";
  btn.hidden = true;
  btn.setAttribute("aria-label", "Instalar o app Culto do Amigo");
  btn.innerHTML =
    '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>' +
    "<span>Instalar</span>";

  const nav = header.querySelector(".main-nav");
  if (nav) nav.appendChild(btn);
  else header.appendChild(btn);

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    btn.hidden = false;
  });

  btn.addEventListener("click", async () => {
    if (isIos()) {
      showIosHint();
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.hidden = true;
  });

  window.addEventListener("appinstalled", () => {
    btn.hidden = true;
    deferredPrompt = null;
  });

  // iOS Safari never fires beforeinstallprompt — show the button anyway and
  // walk through its own Share > Adicionar à Tela de Início flow instead.
  if (isIos()) btn.hidden = false;
}

function showIosHint() {
  if (document.getElementById("ios-install-hint")) return;
  const hint = document.createElement("div");
  hint.id = "ios-install-hint";
  hint.className = "ios-install-hint";
  hint.innerHTML = `
    <div class="ios-install-hint__card">
      <p>
        Pra instalar, toque no ícone de compartilhar
        <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><rect x="5" y="15" width="14" height="6" rx="1.5"/></svg>
        do navegador e depois em <strong>"Adicionar à Tela de Início"</strong>.
      </p>
      <button type="button" class="btn btn-outline" id="ios-install-hint-close">Entendi</button>
    </div>
  `;
  document.body.appendChild(hint);
  document.getElementById("ios-install-hint-close").addEventListener("click", () => hint.remove());
  hint.addEventListener("click", (event) => {
    if (event.target === hint) hint.remove();
  });
}

mountInstallButton();
