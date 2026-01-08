import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { Drearl, MockERC20, MockERC721 } from "../typechain-types"; // Adjust path as needed

describe("DrearlContract", function () {
    let drearl: Drearl;
    let mockERC20: MockERC20;
    let mockERC721: MockERC721;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let addrs: Signer[];

    // Define some constant test data
    const LAND_PRICE_PER_PLOT = ethers.parseEther("1");
    const NUMBER_OF_PLOTS = 10;
    const TITLE_NUMBER = 12345;
    const STATE = "Lagos";
    const LGA = "Ikeja";
    const CITY = "Lagos City";
    const IMAGE_CID = "QmTestImageCID";
    const COFO_CID = "QmTestCoFoCID";

    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // Deploy MockERC20
        const MockERC20Factory = await ethers.getContractFactory("MockERC20");
        mockERC20 = await MockERC20Factory.deploy(ethers.parseEther("1000000")); // 1M tokens initial supply

        // Deploy MockERC721
        const MockERC721Factory = await ethers.getContractFactory("MockERC721");
        mockERC721 = await MockERC721Factory.deploy();

        // Deploy DrearlContract
        const DrearlFactory = await ethers.getContractFactory("Drearl");
        drearl = await DrearlFactory.deploy(await mockERC20.getAddress(), await mockERC721.getAddress());
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await drearl.owner()).to.equal(await owner.getAddress());
        });

        it("Should set the correct token and nft addresses", async function () {
            expect(await drearl.tokenAddress()).to.equal(await mockERC20.getAddress());
            expect(await drearl.nftAddress()).to.equal(await mockERC721.getAddress());
        });
    });

    describe("Land Registration", function () {
        it("Should allow a user to register land successfully", async function () {
            await expect(drearl.connect(addr1).registerLand(
                NUMBER_OF_PLOTS,
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER,
                IMAGE_CID,
                COFO_CID
            ))
                .to.emit(drearl, "LandRegistered")
                .withArgs(await addr1.getAddress(), 0, STATE, LGA, CITY);

            const lands = await drearl.lands(await addr1.getAddress());
            expect(lands.length).to.equal(1);
            expect(lands[0].numberOfPlots).to.equal(NUMBER_OF_PLOTS);
            expect(lands[0].titleNumber).to.equal(TITLE_NUMBER);
            expect(lands[0].isVerified).to.be.true;
            expect(await drearl.registeredTitles(TITLE_NUMBER)).to.be.true;

            // Verify NFT was minted
            expect(await mockERC721.ownerOf(1)).to.equal(await addr1.getAddress());
        });

        it("Should revert if number of plots is zero", async function () {
            await expect(drearl.connect(addr1).registerLand(
                0, // Zero plots
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER,
                IMAGE_CID,
                COFO_CID
            )).to.be.revertedWithCustomError(drearl, "InvalidNumberOfPlots");
        });

        it("Should revert if title number is zero", async function () {
            await expect(drearl.connect(addr1).registerLand(
                NUMBER_OF_PLOTS,
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                0, // Zero title number
                IMAGE_CID,
                COFO_CID
            )).to.be.revertedWithCustomError(drearl, "InvalidTitleNumber");
        });

        it("Should revert if state is empty", async function () {
            await expect(drearl.connect(addr1).registerLand(
                NUMBER_OF_PLOTS,
                "", // Empty state
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER,
                IMAGE_CID,
                COFO_CID
            )).to.be.revertedWithCustomError(drearl, "InvalidLandLocationDetails");
        });

        it("Should revert if title number already exists", async function () {
            await drearl.connect(addr1).registerLand(
                NUMBER_OF_PLOTS,
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER,
                IMAGE_CID,
                COFO_CID
            );

            await expect(drearl.connect(addr2).registerLand(
                NUMBER_OF_PLOTS,
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER, // Duplicate title number
                IMAGE_CID,
                COFO_CID
            )).to.be.revertedWithCustomError(drearl, "TitleExistAlready");
        });
    });

    describe("Property Registration", function () {
        const NUMBER_OF_ROOMS = 3;
        const NUMBER_OF_BATHROOMS = 2;
        const PROPERTY_PRICE = ethers.parseEther("50");
        const PROPERTY_IMAGE_CID = "QmPropertyImageCID";

        beforeEach(async function () {
            // Register a land first for addr1
            await drearl.connect(addr1).registerLand(
                NUMBER_OF_PLOTS,
                STATE,
                LGA,
                CITY,
                LAND_PRICE_PER_PLOT,
                TITLE_NUMBER,
                IMAGE_CID,
                COFO_CID
            );
        });

        it("Should allow a user to register property successfully", async function () {
            await expect(drearl.connect(addr1).registerProperty(
                0, // landIndex
                NUMBER_OF_ROOMS,
                NUMBER_OF_BATHROOMS,
                PROPERTY_PRICE,
                PROPERTY_IMAGE_CID
            ))
                .to.emit(drearl, "PropertyRegistered")
                .withArgs(await addr1.getAddress(), 0); // Property index

            const properties = await drearl.properties(await addr1.getAddress());
            expect(properties.length).to.equal(1);
            expect(properties[0].landIndex).to.equal(0);
            expect(properties[0].numberOfRooms).to.equal(NUMBER_OF_ROOMS);
            expect(properties[0].price).to.equal(PROPERTY_PRICE);
            expect(properties[0].isVerified).to.be.true;

            // Verify NFT was minted (next token id after land NFT)
            expect(await mockERC721.ownerOf(2)).to.equal(await addr1.getAddress());
        });

        it("Should revert if land index is invalid", async function () {
            await expect(drearl.connect(addr1).registerProperty(
                999, // Invalid landIndex
                NUMBER_OF_ROOMS,
                NUMBER_OF_BATHROOMS,
                PROPERTY_PRICE,
                PROPERTY_IMAGE_CID
            )).to.be.revertedWith("Invalid land index");
        });
    });
});
