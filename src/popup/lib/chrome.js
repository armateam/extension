export function openTab(url) {
  chrome.tabs.create({
    url
  })

  window.close()
}
