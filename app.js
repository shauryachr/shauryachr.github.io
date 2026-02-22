const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const sidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

sidebarBtn.onclick = () => {
  sidebar.classList.toggle("collapsed");
};

sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

voiceBtn.onclick = () => {
  const recognition = new webkitSpeechRecognition();
  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    sendMessage();
  };
  recognition.start();
};

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  toggleTyping(true);

  let response = "";

  if (GREETINGS.includes(text.toLowerCase())) {
    response = "Hello! How can I assist you today?";
  }
  else if (FOUNDER_PATTERNS.some(p => text.toLowerCase().includes(p))) {
    response = "Shaurya Chauhan is the CEO of Shaurya AI (ChatBot).";
    speak(response);
  }
  else {
    const wiki = await fetchWiki(text);
    response = wiki || "Sorry, no reliable information found.";
  }

  toggleTyping(false);
  addMessage(response, "ai");
  speak(response);
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}