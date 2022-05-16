export default function downloadTextFile(text : string, name : string): void {
    const a = document.createElement('a');
    const type = name.split(".").pop();
    a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }));
    a.download = name;
    a.click();
}

export function uploadTextFile(callback: (contents: string) => void): void {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        var file = (e.target! as any).files[0]; 
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            callback(readerEvent.target!.result as string);
        }
    }

    input.click();
}