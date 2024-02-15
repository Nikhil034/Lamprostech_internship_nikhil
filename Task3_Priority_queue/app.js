const http = require("http");
const fs = require("fs");
const readline = require("readline");
const event = require("events");
const eventemitter = new event.EventEmitter();
let queuecall = require("./binaryheap");

let pq = new queuecall.test();


const file = readline.createInterface({
    input: fs.createReadStream('command.txt'),
    output: process.stdout,
    terminal: false
});


eventemitter.on('enqueue', (priorityValue) => pq.enqueue(priorityValue));
eventemitter.on('dequeue', () => pq.dequeue());


file.on('line', (line) => {
    let SplitFirst = line.split(" ");

    let OperationText = SplitFirst[0];
    let PriorityValue = SplitFirst[1];

    if (OperationText === 'enqueue') {
        eventemitter.emit('enqueue', PriorityValue);
    }
    if (OperationText === 'dequeue') {
        eventemitter.emit('dequeue');
    }


})

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;

    if (url === '/size') {
        let s = pq.size();
        res.write(`Size of priority queue is=>${s}`);
        res.end();
    }

}).listen(3000);
