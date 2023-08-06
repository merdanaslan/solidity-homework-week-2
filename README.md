# solidity-homework-week-2

## Contract Address: 0x4273e5B36290bC44D38d580a9500Fbec63B155D6

### Contract deployment transaction

https://sepolia.etherscan.io/tx/0xcf86e87f1b8e300139c084250c6e667195b8c612f9cd4e18ad2f25edc51f265b

### giveRightToVote transactions
* Sebastian d'Anconia https://sepolia.etherscan.io/tx/0x15e9375762c5b7782bda8465cbd66b3353b753be8e8d4bd5f0829488816ac8ac
* adi98719199 https://sepolia.etherscan.io/tx/0x93537bf0ccba3a82be1b0cf8b7e7ef36179b4fbbe70b31f243de67a617433aaf


### Vote transactions
* https://sepolia.etherscan.io/tx/0xfd1ef1ce8c160236837f4e16f14f6c42ecf6a7f8bea475927c6718863518e7bb
* https://sepolia.etherscan.io/tx/0xe37b2d6acee209f3cf9ab4315845470d3d53e14e30e519cbed8a6c817b0a4cdf


### Rejected vote transactions 

* https://sepolia.etherscan.io/tx/0x2dee49ea5c5c946083ccda720c428b6ae8adae78ddba2bdd9ce3a90f28ce0955 **already voted**


### Voting results 





### Note 

* I got the following error message when using portal:
```
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
Error: server response 502 Bad Gateway (request={  }, response={  }, error=null, code=SERVER_ERROR, version=6.7.0)
    at makeError (C:\Users\Merdan\Desktop\solidity-week-2\node_modules\ethers\src.ts\utils\errors.ts:685:21)
    at assert (C:\Users\Merdan\Desktop\solidity-week-2\node_modules\ethers\src.ts\utils\errors.ts:702:25)
    at FetchResponse.assertOk (C:\Users\Merdan\Desktop\solidity-week-2\node_modules\ethers\src.ts\utils\fetch.ts:896:15)
    at JsonRpcProvider._send (C:\Users\Merdan\Desktop\solidity-week-2\node_modules\ethers\src.ts\providers\provider-jsonrpc.ts:1159:18)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async C:\Users\Merdan\Desktop\solidity-week-2\node_modules\ethers\src.ts\providers\provider-jsonrpc.ts:500:40 {
  code: 'SERVER_ERROR',
  request: FetchRequest {},
  response: FetchResponse {},
  error: undefined
}
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)
```
**The error dissapeared when using alchemy instead**

* I got another Error: Warning! Error encountered during contract execution [out of gas] https://sepolia.etherscan.io/tx/0x998191cbaf202e16a53ae1df982f0c711263c8586d60dccb1fded5c7f40ba25c

**The error dissapeared when increasing the gaslimit from 50000 to 500000**




#### Commands

```bash
yarn run deploy Pizza Burger Taco
yarn run vote <contract> <vote>
yarn run giveRightToVote <contract> <address>
yarn run delegate <contract> <address>
yarn run viewProposals <contract>
yarn run winnerProposal <contract>
yarn run winnerName <contract> 
