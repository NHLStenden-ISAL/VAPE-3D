import {create, all} from "mathjs";

const math = create(all, {matrix:'Array'});
math.import({
    printValue(x:any){
        console.log(`OUTPUT: ${x}`);
    }
});

export function loadData(dataObj:Object){
    for(const [key, value] of Object.entries(dataObj)){
        math.import({[key]: value},{override:true});
    }
}

export function deleteData(dataObj:Object){
    for(const key of Object.keys(dataObj)){
        math.import({[key]: ()=>{console.log("function does not exist anymore")}},{override:true});
    }
}

//Exceptions for when the brackets are not an indexer
const nonIndexerCharacters = ['',' ']

//thanks ChatGPT (*^▽^*)
function replaceArrayIndices(str: string) {
    let result = '';
    let idx = 0;
    //loop over input string
    while (idx < str.length) {
      const char = str[idx];
      //if character is [, but isnt the first character of string or has a space infront
      if (char === '[' && !nonIndexerCharacters.includes(idx>0?str[idx-1]:'')) {
        let count = 1;
        let endIdx = idx + 1;
        //finds the index of matching closing bracket
        while (endIdx < str.length && count > 0) {
          if (str[endIdx] === '[') count++;
          if (str[endIdx] === ']') count--;
          endIdx++;
        }
        //gets the inside of bracket
        const inside = str.slice(idx + 1, endIdx - 1);
        //replaces inside with a recursive call to be sure that all nested indexers are incrmented
        result += '[' + replaceArrayIndices(inside) + '+1]';
        idx = endIdx;
      } else {
        //if found character is not an opening bracket, then the character can simply be added to the result
        result += char;
        idx++;
      }
    }
    return result;
  }

export function evaluate(expression:string, scope?:object){
    return math.evaluate(replaceArrayIndices(expression), scope);
}