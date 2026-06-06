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
                    const originalLine=line;
                    line=line.replace("$","")
                    line=line.replace(">>>","")
                    line=line.replace(">>","")
                    line=line.replace("PS>","")
                    if(line!=originalLine)
                        line=line.trimStart();
                    line=line.replace(/^\d+\s+/,"");
                    return line;
                })
                navigator.clipboard.writeText(cleaned.join("\n"))
                return cleaned.join("\n");
            }
        })
    
    }
})