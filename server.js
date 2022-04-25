const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
const HTTP_PORT = args.port || process.env.PORT || 8080

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

// inserted from a02

function coinFlip() {
    var value = Math.round(Math.random);
    let result = "";
    if (value < 1) {
        result = "tails";
    } else {
        result = "heads";
    }
    return result;
    }

function coinFlips(flips) {
    var flipArray = [];
    for (let i = 0; i < flips; i++) {
        flipArray[i] = coinFlip();
    }
    return flipArray;
    }

function countFlips(array) {
    let headsAmt = 0;
    let tailsAmt = 0;
    let result = {tails: tailsAmt, heads: headsAmt}
    for (let i = 0; i < array.length; i++) {
        if (array[i] == "heads") {
        headsAmt += 1;
        } else if (array[i] == "tails") {
        tailsAmt += 1;
        }
    }
    console.log(array);
    return result;
    }

function flipACoin(call) {
    var flipV = coinFlip();
    var resultV = "";
    if (call == flipV) {
        resultV = "win";
    } else {
        resultV = "lose";
    }
    const finalResult = {call: call, flip: flipV, result: resultV};
    return finalResult;
    }

app.get('/app/flip/', (req, res) => {
    res.statusCode = 200;
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end('{"flip":"' + coinFlip() + '"}')
    });

app.get('/app/flips/:number', (req, res) => {
    var doAFlip = coinFlips(req.params.number)
    var countThem = countFlips(doAFlip)
    res.status(200).json({'raw' : doAFlip, 'summary' : countThem})
    });

app.get('/app/flip/call/:which(heads|tails)/', (req, res) => {
    const guessing = flipACoin(req.params.which)
    res.status(200).json(guessing)
});

// uh oh
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
    });