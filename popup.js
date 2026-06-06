const inputField=document.getElementById("apikey");
const button=document.getElementById("saveBtn");

button.addEventListener("click",()=>{
    chrome.storage.local.set({geminiKey:inputField.value})
    const savedMsg=document.getElementById("savedMsg");
    savedMsg.style.display="block"
})

chrome.storage.local.get("geminiKey",(result)=>{
    if(result.geminiKey)
    {
        inputField.value=result.geminiKey;
    }
})