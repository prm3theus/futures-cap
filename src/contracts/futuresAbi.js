const futures = `[
    {
      "constant": true,
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "oracleClient",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "market",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "futures",
      "outputs": [
        {
          "name": "maker",
          "type": "address"
        },
        {
          "name": "taker",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "thing",
          "type": "string"
        },
        {
          "name": "expiry",
          "type": "uint256"
        },
        {
          "name": "terminated",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "margin",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "futuresBySeller",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_market",
          "type": "string"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_oracle",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "who",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Permit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "taker",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "expiry",
          "type": "uint256"
        }
      ],
      "name": "Build",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "striker",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "Strike",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "market",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "quote",
          "type": "uint256"
        }
      ],
      "name": "LogQuote",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_market",
          "type": "string"
        }
      ],
      "name": "quote",
      "outputs": [
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "maker",
              "type": "address"
            },
            {
              "name": "taker",
              "type": "address"
            },
            {
              "name": "value",
              "type": "uint256"
            },
            {
              "name": "thing",
              "type": "string"
            },
            {
              "name": "expiry",
              "type": "uint256"
            },
            {
              "name": "terminated",
              "type": "bool"
            }
          ],
          "name": "_future",
          "type": "tuple"
        },
        {
          "name": "_sig",
          "type": "bytes"
        }
      ],
      "name": "build",
      "outputs": [
        {
          "name": "done",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "strike",
      "outputs": [
        {
          "name": "done",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`

export default futures;