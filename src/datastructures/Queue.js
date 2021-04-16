export default class Queue {
    constructor() {
        this.list = [];
    }

    isEmpty() {
        return this.list.length === 0;
    }

    enqueue(element) {
        this.list.push(element);
    }

    dequeue() {
        if (this.isEmpty())
            return -1;
        return this.list.shift();
    }
};
