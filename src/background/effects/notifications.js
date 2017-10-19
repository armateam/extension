import watch from 'redux-watch'

// ## //

export default function (store) {
  const watcher = watch(store.getState, 'status.clean')

  return watcher((newVal, oldVal) => {
    if (newVal) {
      if (!oldVal) {
        chrome.notifications.create('armateam.notification', {
          type: 'basic',
          iconUrl: chrome.extension.getURL('images/arma-64.png'),
          title: chrome.i18n.getMessage('notificationOnlineTitle'),
          message: newVal
        })
      } else if (newVal !== oldVal) {
        chrome.notifications.create('armateam.notification', {
          type: 'basic',
          iconUrl: chrome.extension.getURL('images/arma-64.png'),
          title: chrome.i18n.getMessage('notificationStatusChangeTitle'),
          message: newVal
        })
      }
    }
  })
}
