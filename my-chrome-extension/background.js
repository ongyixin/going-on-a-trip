// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("message received", message);
//   if (message.action === 'startTrip') {
//       console.log(`Starting ${message.funLevel} trip `);
//       sendResponse({message: "service worker processed the message"});
//   }
//   return true;
// });