import * as dotenv from 'dotenv';
import { getContractAt } from "./common";
dotenv.config();

async function main() {
  const [contractAddress, voterAddress] = process.argv.slice(2);

  console.log(`Giving right to vote to: ${voterAddress} in contract ${contractAddress}`);

  const ballotContract = await getContractAt(contractAddress);
  await ballotContract.giveRightToVote(voterAddress, { gasLimit: 5000000 });
  
  console.log("Done...");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});