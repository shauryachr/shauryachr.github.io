function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  chat.appendChild(div);
  streamText(div, text);
  chat.scrollTop = chat.scrollHeight;
}

function streamText(el, text) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 15);
}

function toggleTyping(show) {
  document.getElementById("typing").style.display = show ? "block" : "none";
}