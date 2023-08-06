import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { getContractAt } from "./common";
dotenv.config();

async function main() {
  const PROPOSALS_COUNT = 3;
  const [contractAddres] = process.argv.slice(2);
  const ballotContract = await getContractAt(contractAddres);
  
  console.log(`Viewing proposals for contract: ${contractAddres}`);
  for (let index = 0; index < PROPOSALS_COUNT; index++) {
    const proposal = await ballotContract.proposals(index);
    const proposalName = ethers.decodeBytes32String(proposal.name);
    console.log(`Proposal ${index}: ${proposalName} with ${proposal.voteCount} votes`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});