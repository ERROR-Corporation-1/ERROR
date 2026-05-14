export function loadToolbar(){

  const toolbar = document.createElement("div");

  toolbar.className = "topbar";

  toolbar.innerHTML = `

    <a href="index.html">Home</a>

    <a href="ai.html">Ask ERROR</a>

    <a href="origin.html">Origin</a>

    <a href="help.html">Help</a>

  `;

  document.body.prepend(toolbar);

}
