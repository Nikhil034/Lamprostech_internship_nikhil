function test() {
    let collection = [];

    this.printCollection = function () {
        console.log(collection);
    }

    this.enqueue = function (element) {
        collection.push(element);
        this.bubbleUp(collection.length - 1);
        console.log(`Element added successfully with priority: ${element}`);
    }

    this.bubbleUp = function (index) {
        let parentIndex = Math.floor((index - 1) / 2);
        while (index > 0 && collection[index] < collection[parentIndex]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    this.dequeue = function () {
        if (this.isEmpty()) {
            console.log('Priority queue is empty');
            return;
        }
        const min = collection[0];
        const end = collection.pop();
        if (collection.length > 0) {
            collection[0] = end;
            this.sinkDown(0);
        }
        console.log(`Dequeued element is ${min} and the highest priority is now ${collection[0]}`);
    }

    this.sinkDown = function (index) {
        let leftChildIdx = 2 * index + 1;
        let rightChildIdx = 2 * index + 2;
        let smallest = index;
        const length = collection.length;

        if (leftChildIdx < length && collection[leftChildIdx] < collection[smallest]) {
            smallest = leftChildIdx;
        }
        if (rightChildIdx < length && collection[rightChildIdx] < collection[smallest]) {
            smallest = rightChildIdx;
        }
        if (smallest !== index) {
            this.swap(index, smallest);
            this.sinkDown(smallest);
        }
    }

    this.peek = function () {
        if (this.isEmpty()) {
            console.log('Priority queue is empty');
            return;
        }
        console.log(`Peek value is ${collection[0]}`);
    }

    this.isEmpty = function () {
        return collection.length === 0;
    }

    this.size = function () {
        this.printCollection();
        return collection.length;
    };

    this.swap = function (i, j) {
        [collection[i], collection[j]] = [collection[j], collection[i]];
    }
}

module.exports.test = test;




