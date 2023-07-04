import { memoryConfig } from "./MemoryManagement/memoryController"
export const config:memoryConfig = {
    // How many total bytes the program can use.
    // Default = 1024
    maxMemory:1024,

    // How many bytes are stored per line.
    // If a function uses 33 bytes in variables and bytesPerLine is 16, then it gets rounded to 48.
    // Default = 16
    bytesPerLine:16,

    // Enable if you want to print the memory model with additional debug information in console with nearly every intersection.
    // debug:true
    debug: false
}