chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        "title" : "Copy Clean",
        "id" : "1",
        "contexts" : ["selection"]
    })
    chrome.contextMenus.create({
        "title" : "AI Copy Clean",
        "id" : "2",
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
    if(info.menuItemId=="2")
    {
        chrome.storage.local.get("geminiKey",(result)=>{
            if(!result.geminiKey)
            {
                chrome.scripting.executeScript({
                    target : {tabId:tab.id},
                    func : ()=>alert("Please set your Gemini API key by clicking the CodeDistill extension icon")
                })
                return;
            }
            const apiKey=result.geminiKey;
            chrome.scripting.executeScript({
                target : {tabId:tab.id},
                func : ()=>window.getSelection().toString()
            }).then(results=>{
                const text=results[0].result;
                fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
                method : "POST",
                    headers : {
                        "x-goog-api-key" : apiKey,
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        contents : [{
                            parts : [{
                                text : `Extract only the executable code and commands from the following text. Remove line numbers, shell prompts ($, >>>, >>), output lines, logs, and any explanatory prose. Return only the clean code, nothing else, no explanations.\n\n${text}`
                            }]
                        }]
                    })
                })
                .then(response=>response.json())
                .then(data=>{
                    if(data.error)
                    {
                        chrome.scripting.executeScript({
                            target : {tabId:tab.id},
                            func : ()=>alert("API Error: Request failed. Please try again later.")
                        })
                        return;
                    }
                    console.log(JSON.stringify(data))
                    const cleanedText=data.candidates[0].content.parts[0].text
                    console.log("Gemini response:", cleanedText)
                    chrome.scripting.executeScript({
                        target : {tabId:tab.id},
                        func : (text)=>navigator.clipboard.writeText(text),
                        args : [cleanedText]
                    })
                })
            })
        })
    }
})