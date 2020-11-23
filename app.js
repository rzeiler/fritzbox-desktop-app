const { app, BrowserWindow, Menu } = require("electron"); // http://electron.atom.io/docs/api
const path = require("path");

const Store = require("electron-store");
const store = new Store();

let pwd = store.get("pwd");
let window = null;
let _icon = path.join("assets", "fritz_icon.png");

// Wait until the app is ready
app.once("ready", () => {
  // Create a new window
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Loading...",
    icon: _icon,
    show: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const template = [
    {
      label: "Einstellungen",
      role: "open",
      click: function (menuItem, browserWindow, event) {
        console.log("click");
        browserWindow.loadURL(__dirname + "/config.html");
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  window.loadURL("http://fritz.box");
  //window.loadURL(__dirname + "/config.html");

  // Show window when page is ready
  window.once("ready-to-show", () => {
    window.show();
    window.removeMenu();
  });

  let script = `
function get(id){
  return document.getElementById(id);
}
var btn = get("submitLoginBtn");
var inp = get("uiPass");
var err = get("uiLoginError");

if(inp){
  inp.value= "${pwd}"
  btn.click();
}
`;

  window.webContents.on("dom-ready", function (e) {
    pwd = store.get("pwd");
    window.webContents.executeJavaScript(script);
  });

  //window.webContents.openDevTools();
});
