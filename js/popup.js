document.addEventListener('DOMContentLoaded', function () {

    let changebgBtn = document.getElementById('changebgbtn');

    changebgBtn.onclick = function getCurrentTabUrl() {

        chrome.tabs.getAllInWindow(null, (tabs) => {
        
            for(let tab of tabs) {
                if(tab.url == 'chrome://newtab/') {
                    chrome.tabs.sendMessage(tab.id, {action: "updateImage"}, function(msg) {
                        msg = msg || {};
                        console.log('onResponse', msg.farewell);
                    });
                }
            }
            window.close();

        });
        
    }

});