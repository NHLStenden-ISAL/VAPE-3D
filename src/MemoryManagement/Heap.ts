export class Heap{
    private heap:number[]
    private allocations:Map<number,number> // Map<index,size>
    private maxAddress:number

    constructor(maxAddress:number){
        this.heap = [];
        this.allocations = new Map();
        this.maxAddress = maxAddress;
    }

    // converts index to address. Uses the same calculation as addressToIndex,
    // but decided to keep as two seperate functions so its clear when you are working with an index or address.
    private indexToAddress(index:number){
        return this.maxAddress - index - 1
    }

    private addressToIndex(address:number){
        return this.maxAddress - address - 1
    }

    // expand heap by {size} bytes, said bytes are randomized
    private expand(size:number){
        let nextIndex = this.heap.length
        let junkArray = Array(size).fill(0).map(()=>{return Math.floor(Math.random()*256)})
        this.heap = this.heap.concat(junkArray)
        return nextIndex
    }

    // removes trailing unused bytes from heap, allowing it to shrink. Does NOT remove fragmentation!
    private shrink(){
        if(this.allocations.size===0){
            this.heap=[]
            return
        }
        let sortedAllocations = [...this.allocations.entries()].sort(([key1],[key2])=>key2-key1)
        let highestBlock = sortedAllocations[0]
        //remove up until the last byte from heap
        this.heap = this.heap.slice(0,highestBlock[0]+highestBlock[1])
    }

    // claim {size} bytes on the heap and return its address
    public allocate(size:number){
        // first try to find a empty block in heap and return index of first byte of empty block. else expand the heap
        let index = this.findFreeBlock(size) ?? this.expand(size)
        this.allocations.set(index,size)
        return this.indexToAddress(index)
    }

    // free the allocation on {address}, but does not reset the data on those bytes
    public free(address:number){
        let index = this.addressToIndex(address)
        // simply remove the index from allocations map. Let the data stay in the heap
        this.allocations.delete(index)
        this.shrink()
    }

    // tries to find a block of {size} unused bytes in the empty spots on the heap. returns null if nothing found
    private findFreeBlock(size:number): number|null{
        let sortedAllocations = [...this.allocations.entries()].sort(([key1],[key2])=>key1-key2)
        let foundIndex = null;
        sortedAllocations.every(([blockIndex,blockSize],index)=>{
            // check index first if not last element
            if(index+1===sortedAllocations.length) return false
            // size of empty block is index of first byte of next block, minus first index of empty block (is index of used block plus its size)
            if((sortedAllocations[index+1][0] - (blockIndex+blockSize)) >= size){
                foundIndex = blockIndex+blockSize
                return false;
            }
            return true;
        });
        return foundIndex;
    }

    // write amount of bytes to {address}, accepts a binary value
    public write(address:number, bytesToWrite:number, binaryValue:string){
        let index = this.addressToIndex(address)
        for(let i = 0; i < bytesToWrite; i++){
            this.heap[index + i] = parseInt(binaryValue.slice(i*8,(i+1)*8),2)
        }
    }

    // read amount of bytes from {address}
    public read(address:number, bytesToRead:number){
        let result = ''
        let index = this.addressToIndex(address)
        for(let i = 0; i < bytesToRead; i++){
            result += this.heap[index + i].toString(2).padStart(8,'0')
        }
        return result
    }

    // dump the heap as a array of hex values
    public hexdump(){
        return this.heap.map((val)=>{return val.toString(16).padStart(2,'0')})
    }

    // get the size of the heap
    public getSize(){
        return this.heap.length
    }

}