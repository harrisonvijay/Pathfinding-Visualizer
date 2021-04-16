class PQElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
};

class PriorityQueue {
    constructor() {
        this.list = [];
    }

    isEmpty() {
        return this.list.length === 0;
    }

    enqueue(element) {
        this.list.push(element);
        this.list.sort((ele1, ele2) => {
            return ele1.priority - ele2.priority;
        })
    }

    dequeue() {
        if (this.isEmpty())
            return null;
        var eleToReturn = this.list.shift();
        return eleToReturn.element;
    }
};

// Heap Implementation - but the other one looks good while visualizing
// class PriorityQueue {
//     constructor() {
//         this.maxSize = 10000;
//         this.list = Array(this.maxSize);
//         this.size = 0;
//     }

//     isEmpty() {
//         return this.size === 0;
//     }

//     enqueue(element) {
//         if (this.size == this.maxSize - 1)
//             return false;
//         this.list[this.size] = element;
//         var child = this.size;
//         var parent = Math.floor((child - 1) / 2);
//         while (parent >= 0) {
//             if (this.list[parent].priority > this.list[child].priority) {
//                 let temp = this.list[parent];
//                 this.list[parent] = this.list[child];
//                 this.list[child] = temp;
//                 child = parent;
//                 parent = Math.floor((child - 1) / 2);
//             }
//             else {
//                 break;
//             }
//         }
//         this.size++;
//         this.print();
//         return true;
//     }

//     dequeue() {
//         if (this.isEmpty())
//             return null;
//         var eleToReturn = this.list[0];
//         this.size--;
//         this.list[0] = this.list[this.size];
//         this.list[this.size] = undefined;
//         var parent = 0;
//         var lChild = 2 * parent + 1, rChild = 2 * parent + 2;
//         var replaceWith;
//         while (parent < this.size) {
//             replaceWith = -1;
//             if (lChild < this.size && this.list[lChild].priority < this.list[parent].priority) {
//                 replaceWith = lChild;
//             }
//             if (rChild < this.size && this.list[rChild].priority < this.list[parent].priority && this.list[rChild].priority < this.list[lChild].priority) {
//                 replaceWith = rChild;
//             }
//             if (replaceWith === -1) {
//                 break;
//             }
//             let temp = this.list[replaceWith];
//             this.list[replaceWith] = this.list[parent];
//             this.list[parent] = temp;
//             parent = replaceWith;
//             lChild = 2 * parent + 1;
//             rChild = 2 * parent + 2;
//         }
//         this.print();
//         return eleToReturn.element;
//     }
// };

export { PQElement, PriorityQueue };