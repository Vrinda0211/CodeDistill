importScripts('utils/cleaner.js')

chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        "title" : "Copy Clean",
        "id" : "1",
        "contexts" : ["selection"]
    })
})

chrome.contextMenus.onClicked.addListener((info,tab)=>{
    if(info.menuItemId=="1")
    {
        const text=info.selectionText
    }
})