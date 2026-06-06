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
        chrome.scripting.executeScript({
            target : {tabId : tab.id},
            func : ()=>{
                const text=window.getSelection().toString();
                const lines=text.split(/\r\n|\r|\n/);
                const cleaned=lines.map(line=>{
                    line=line.replace("$","").trimStart();
                    line=line.replace(">>>","").trimStart();
                    line=line.replace(">>","").trimStart();
                    line=line.replace("PS>","").trimStart();
                    line=line.replace(/^\d+\s+/,"");
                    return line;
                })
                navigator.clipboard.writeText(cleaned.join("\n"))
                return cleaned.join("\n");
            }
        })
    
    }
})