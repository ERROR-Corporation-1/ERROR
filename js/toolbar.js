export function loadToolbar(type){

  const bar = document.createElement("div");
  bar.className = "topbar";

  let content = "";

  if(type === "home"){
    content = `
      <a href="ai.html">Ask ERROR</a>
      <a href="errormc.html">ERROR MC</a>
      <a href="origin.html">Origin</a>
      <a href="help.html">Help</a>
    `;
  }

  if(type === "ai"){
    content = `
      <div class="logo-area">
        <img src="assets/ERROR Logo 1.png">
        <h1>ERROR AI</h1>
      </div>
      <a href="index.html">Home</a>
    `;
  }

  if(type === "mc"){
    content = `
      <div class="logo-area">
        <img src="assets/ERROR Logo 1.png">
        <h1>ERROR MC</h1>
      </div>
      <a href="index.html">Home</a>
    `;
  }

  if(type === "origin"){
    content = `
      <div class="logo-area">
        <img src="assets/ERROR Logo 1.png">
        <h1>ERROR ORIGIN</h1>
      </div>
      <a href="index.html">Home</a>
    `;
  }

  bar.innerHTML = content;
  document.body.prepend(bar);
}
