export function loadToolbar(){

  const bar = document.createElement("div");

  bar.className = "topbar";

  bar.innerHTML = `

    <a href="ai.html">Ask ERROR</a>

    <a href="errormc.html">ERROR MC</a>

    <a href="origin.html">Origin</a>

    <a href="help.html">Help</a>

  `;

  document.body.prepend(bar);

}
