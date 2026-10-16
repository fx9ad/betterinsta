(() => {
  const ROOT_ID = "igrs-root";
  const OPEN_KEY = "igrs-open";

  // Remove slashes/backslashes and extra spaces from whatever was typed.
  const clean = (s) => s.replace(/[\/\\#]+/g, " ").replace(/\s+/g, " ").trim();

  const store = {
    get: () => { try { return sessionStorage.getItem(OPEN_KEY) === "1"; } catch { return false; } },
    set: (v) => { try { sessionStorage.setItem(OPEN_KEY, v ? "1" : "0"); } catch {} },
  };

  function runSearch(raw) {
    const q = clean(raw);
    if (!q) return;
    location.href = `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(q)}`;
  }

  function build() {
    if (document.getElementById(ROOT_ID) || !document.body) return;

    const root = document.createElement("div");
    root.id = ROOT_ID;

    const panel = document.createElement("div");
    panel.className = "igrs-panel";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search reels…";
    input.autocomplete = "off";
    input.spellcheck = false;

    const go = document.createElement("button");
    go.className = "igrs-go";
    go.textContent = "Search";
    go.addEventListener("click", () => runSearch(input.value));

    panel.append(input, go);

    const toggle = document.createElement("button");
    toggle.className = "igrs-toggle";
    toggle.title = "Search reels  ( / )";
    toggle.setAttribute("aria-label", "Search reels");
    toggle.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';

    function setOpen(v, focus) {
      root.classList.toggle("igrs-open", v);
      store.set(v);
      if (v && focus) setTimeout(() => input.focus(), 0);
    }

    toggle.addEventListener("click", () => setOpen(!root.classList.contains("igrs-open"), true));

    // Keep Instagram's own shortcuts from firing while typing here.
    ["keydown", "keyup", "keypress"].forEach((ev) =>
      input.addEventListener(ev, (e) => {
        e.stopPropagation();
        if (ev === "keydown") {
          if (e.key === "Enter") runSearch(input.value);
          if (e.key === "Escape") { input.blur(); setOpen(false); }
        }
      })
    );

    root.append(panel, toggle);
    document.body.appendChild(root);

    const q = new URLSearchParams(location.search).get("q");
    if (q) input.value = clean(q);

    if (store.get()) setOpen(true, false);

    // "/" opens and focuses the bar when you're not typing somewhere else.
    document.addEventListener(
      "keydown",
      (e) => {
        const t = e.target;
        const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
        if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true, true);
        }
      },
      true
    );
  }

  build();
  // Instagram is a single-page app; make sure the widget survives re-renders.
  setInterval(build, 1500);
})();
