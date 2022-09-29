// popup.js

for (let elem of document.getElementsByClassName('app_version'))
  elem.innerText = browser.runtime.getManifest().version;

const configElems = ["reels", "suggestions"];

document.body.onload = () => {
  chrome.storage.sync.get("data", (items) => {
    let data = (items || {}).data || {};
    console.log("Restore", data);
    if (chrome.runtime.error) return;
    for (let configElem of configElems)
      document.getElementById(configElem).checked = data[configElem] === true;
  });
};

const changeEvent = () => {
  let d = {};
  for (let configElem of configElems)
    d[configElem] = document.getElementById(configElem).checked === true;

  chrome.storage.sync.set({ data: d }, () => {
    if (chrome.runtime.error) return;
  });
};
for (let configElem of configElems)
  document.getElementById(configElem).onchange = changeEvent;
