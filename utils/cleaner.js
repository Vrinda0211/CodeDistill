function cleanCode(text)
{
    console.log(JSON.stringify(text));
    const lines=text.split("/\r\n|\r|\n/");
    const cleaned=lines.map(line=>{
        line=line.replace("$","").trimStart();
        line=line.replace(">>>","").trimStart();
        line=line.replace(">>","").trimStart();
        line=line.replace("PS>","").trimStart();
        line=line.replace(/^\d+\s+/,"");
        return line;
    })
    return cleaned.join("\n");
}