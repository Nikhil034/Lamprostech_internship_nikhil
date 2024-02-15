function Priorityqueuecall() {

    let collection = [];
    this.printcollection = function () {
        console.log(collection);
    }

    this.enqueue = function (ele) {
        if (this.IsEmpty()) {
            collection.push(ele)
        }
        else {
            var added = false;
            for (var i = 0; i < collection.length; i++) {
                if (ele < collection[i]) { //checking priorities
                    collection.splice(i, 0, ele);
                    //position | remove position | elemen to add position i
                    added = true;
                    break;
                }
            }
            if (!added) {
                collection.push(ele);
            }
        }
        console.log(`element add succesfully with priority :-${ele}`);
    }
    this.IsEmpty = function () {
        return (collection.length === 0);
    }
    this.dequeue = function () {
        let Deqvalue = collection.shift();
        console.log(`Dequeue element is ${Deqvalue} and highest priority is now =${collection[0]}`);
    }
    this.peek = function () {
        let Highestpriorityval = collection[0];
        console.log(`Peek value is =${Highestpriorityval}`);
    }
    this.size = function () {
        this.printcollection();
        return collection.length;
    };
}


module.exports.Priorityqueuecall = Priorityqueuecall;