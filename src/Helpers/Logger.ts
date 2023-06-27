var idCounter = 0;
const consoleListeners : any = {};

export function addConsoleListener(listener : any) {
    var id = idCounter++;
    consoleListeners[id] = listener;
    return id;
}

export function removeConsoleListener(id : number) {
    delete consoleListeners[id];
}

const oldConsoleLog = console.log;
console.log = function(message?: any, ...optionalParams: any[]) {
    oldConsoleLog(message, optionalParams);
    Object.keys(consoleListeners).forEach( key => {
        consoleListeners[key]('' + message);
    });
}
