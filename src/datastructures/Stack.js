export default class Stack {
    constructor() {
        this.list = [];
    }

    isEmpty() {
        return this.list.length === 0;
    }

    push(element) {
        this.list.push(element);
    }

    pop() {
        if (this.isEmpty())
            return -1;
        return this.list.pop();
    }
};
