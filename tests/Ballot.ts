import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";


const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function RandomVote() {
    const min = 0;
    const max = Math.floor(PROPOSALS.length);
    return Math.floor(Math.random() * (max - min) + min);
}

async function deployContract() {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotFactory.deploy(
        PROPOSALS.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();
    return ballotContract;
}

describe("Ballot", async () => {
    let ballotContract: Ballot;
    let accounts: HardhatEthersSigner[];
    beforeEach(async () => {
        ballotContract = await loadFixture(deployContract);
        accounts = await ethers.getSigners();
    });

    describe("when the contract is deployed", async () => {
        it("has the provided proposals", async () => {
            PROPOSALS.forEach(async (p, i) => {
                const proposal = await ballotContract.proposals(i);
                expect(ethers.decodeBytes32String(proposal.name)).to.eq(p);
            })
        });

        it("has zero votes for all proposals", async () => {
            PROPOSALS.forEach(async (p, i) => {
                const proposal = await ballotContract.proposals(i);
                expect(ethers.toBigInt(proposal.voteCount)).to.eq(0);
            })
        });
        it("sets the deployer address as chairperson", async () => {
            const chairpeson = await ballotContract.chairperson();
            expect(chairpeson).to.eq(accounts[0].address)
        });
        it("sets the voting weight for the chairperson as 1", async () => {
            const chairnsonVoter = await ballotContract.voters(accounts[0].address);
            expect(chairnsonVoter.weight).to.eq(1);
        });
    });

    describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
        it("gives right to vote for another address", async () => {
            let voters = await ballotContract.voters(accounts[1]);
            expect(voters[0]).eq(0n);
            await ballotContract.giveRightToVote(accounts[1]);
            voters = await ballotContract.voters(accounts[1]);
            expect(voters[0]).eq(1n);
        });
        it("can not give right to vote for someone that has voted", async () => {
            await ballotContract.giveRightToVote(accounts[1]);
            await ballotContract.connect(accounts[1]).vote(RandomVote());
            await expect(ballotContract.giveRightToVote(accounts[1])).to.be.revertedWith("The voter already voted.");
        });
        it("can not give right to vote for someone that has already voting rights", async () => {
            await ballotContract.giveRightToVote(accounts[1]);
            await expect(ballotContract.giveRightToVote(accounts[1])).to.be.revertedWithoutReason();
        });
    });

    describe("when the voter interacts with the vote function in the contract", async () => {
        it("should register the vote", async () => {
            await ballotContract.vote(0n);
            const proposal = await ballotContract.proposals(0);
            expect(ethers.toBigInt(proposal.voteCount)).not.eq(0);
        });
    });

    describe("when the voter interacts with the delegate function in the contract", async () => {
        it("should transfer voting power", async () => {
            let delegate1 = await ballotContract.voters(accounts[1]);
            expect(delegate1[0]).to.equal(0n);
            await ballotContract.giveRightToVote(accounts[1]);
            await ballotContract.delegate(accounts[1]);
            delegate1 = await ballotContract.voters(accounts[1]);
            expect(delegate1[0]).to.equal(2n);
        });
    });

    describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
        it("should revert", async () => {
            await expect(ballotContract.connect(accounts[1]).giveRightToVote(accounts[2].address)).to.be.revertedWith("Only chairperson can give right to vote.");
        });
    });

    describe("when an account without right to vote interacts with the vote function in the contract", async () => {
        it("should revert", async () => {
            await expect(ballotContract.connect(accounts[1]).vote(0n)).to.be.revertedWith("Has no right to vote");
        });
    });

    describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
        it("should revert", async () => {
            await expect(ballotContract.connect(accounts[1]).delegate(accounts[2])).to.be.revertedWith("You have no right to vote");
        });
    });

    describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
        it("should return 0", async () => {
            const winner = await ballotContract.winningProposal()
            expect(winner).to.equal(0n);
        });
    });

    describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
        it("should return 0", async () => {
            await ballotContract.vote(0n);
            const winner = await ballotContract.winningProposal()
            expect(winner).to.equal(0n);
        });
    });

    describe("when someone interacts with the winnerName function before any votes are cast", async () => {
        it("should return name of proposal 0", async () => {
            const name = await ballotContract.winnerName()
            expect(ethers.decodeBytes32String(name)).to.equal("Proposal 1")
        });
    });

    describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
        it("should return name of proposal 0", async () => {
            await ballotContract.vote(0n);
            const name = await ballotContract.winnerName();
            expect(ethers.decodeBytes32String(name)).to.equal("Proposal 1");
        });
    });

    describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
        it("should return the name of the winner proposal", async () => {
            await ballotContract.vote(RandomVote());
            for (let i = 1; i <= 4; i++) {
                await ballotContract.giveRightToVote(accounts[i]);
                await ballotContract.connect(accounts[i]).vote(RandomVote());
            }
            const name = await ballotContract.winnerName();
            const winner = await ballotContract.winningProposal()
            const proposal = await ballotContract.proposals(winner);
            expect(name).to.equal(proposal.name);
        });
    });
});