const { remote } = require('electron');
const Store = remote.require("electron-store");
const store = new Store();
const getInp = document.querySelector('#fritzPwd');
const getBtn = document.querySelector('#save');

getBtn.addEventListener('click', () => {
  //alert(getInp.value);
  store.set("pwd",getInp.value);
});

let fritzPwd = store.get("pwd");
getInp.value = fritzPwd;
 