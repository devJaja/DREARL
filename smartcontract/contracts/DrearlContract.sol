// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./lib/Errors.sol";
import "./lib/Events.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IERC721NFT.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Drearl {
    address tokenAddress;
    address nftAddress;
    address public owner;

    mapping(uint => bool) public registeredTitles;

    enum RealEstateType { Land, Property }

    struct Land {
        uint numberOfPlots;
        uint titleNumber;
        string state;
        string lga;
        string city;
        uint256 pricePerPlot;
        bool isVerified;
        bool forSale;
        string imageCID;
        string coFoCID; // Certificate of Occupancy IPFS hash
    }

    struct Property {
        uint landIndex; // Index in the owner's lands array
        uint numberOfRooms;
        uint numberOfBathrooms;
        uint256 price;
        bool isVerified;
        bool forSale;
        string imageCID;
    }

    struct RealEstate {
        RealEstateType realEstateType;
        uint index; // Index in the respective array (lands or properties)
    }

    mapping(address => RealEstate[]) public realEstates;
    mapping(address => Land[]) public lands;
    mapping(address => Property[]) public properties;

    // struct for available listings
    struct RealEstateSale {
        address owner;
        uint realEstateIndex;
    }

    RealEstateSale[] public realEstatesForSale;

    struct LandHistory {
        address soldFrom;
        address soldTo;
        uint amount;
        uint numberofPlots;
        uint date;
    }

    //todo: work logic to map land historical data to land index & update in code
    mapping(uint => LandHistory[]) public landHistoricalData;

    constructor(address _tokenAddress, address _nftAddress) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        nftAddress = _nftAddress;
    }

    // setter functions
    function registerLand(
        uint _numberOfPlots,
        string memory _state,
        string memory _lga,
        string memory _city,
        uint256 _pricePerPlot,
        uint _titleNumber,
        string memory _imageCID,
        string memory _coFoCID
    ) external {
        if (_numberOfPlots == 0) {
            revert Errors.InvalidNumberOfPlots();
        }

        if (_titleNumber == 0) {
            revert Errors.InvalidTitleNumber();
        }

        if (bytes(_state).length == 0 || bytes(_lga).length == 0 || bytes(_city).length == 0) {
            revert Errors.InvalidLandLocationDetails();
        }

        if (registeredTitles[_titleNumber]) {
            revert Errors.TitleExistAlready();
        }

        registeredTitles[_titleNumber] = true;

        Land memory newLand = Land({
            numberOfPlots: _numberOfPlots,
            lga: _lga,
            state: _state,
            city: _city,
            pricePerPlot: _pricePerPlot,
            titleNumber: _titleNumber,
            forSale: false,
            isVerified: true,
            imageCID: _imageCID,
            coFoCID: _coFoCID
        });

        lands[msg.sender].push(newLand);
        uint landIndex = lands[msg.sender].length - 1;
        realEstates[msg.sender].push(RealEstate({
            realEstateType: RealEstateType.Land,
            index: landIndex
        }));

        LandHistory memory landHistory = LandHistory({
            soldFrom: address(0),
            soldTo: msg.sender,
            amount: 0,
            numberofPlots: _numberOfPlots,
            date: block.timestamp
        });

        landHistoricalData[landIndex].push(landHistory);

        INFT(nftAddress).mint(msg.sender, 1, 1, "");

        emit Events.LandRegistered(msg.sender, landIndex, _state, _lga, _city);
    }

    function registerProperty(
        uint _landIndex,
        uint _numberOfRooms,
        uint _numberOfBathrooms,
        uint256 _price,
        string memory _imageCID
    ) external {
        // Ensure the land is registered and owned by the sender
        require(_landIndex < lands[msg.sender].length, "Invalid land index");

        Property memory newProperty = Property({
            landIndex: _landIndex,
            numberOfRooms: _numberOfRooms,
            numberOfBathrooms: _numberOfBathrooms,
            price: _price,
            isVerified: true,
            forSale: false,
            imageCID: _imageCID
        });

        properties[msg.sender].push(newProperty);
        uint propertyIndex = properties[msg.sender].length - 1;
        realEstates[msg.sender].push(RealEstate({
            realEstateType: RealEstateType.Property,
            index: propertyIndex
        }));

        INFT(nftAddress).mint(msg.sender, 1, 1, "");

        emit Events.PropertyRegistered(msg.sender, propertyIndex);
    }


    function buyRealEstate(
        uint _realEstateIndex,
        address _landOwner
    ) external {
        RealEstate storage realEstate = realEstates[_landOwner][_realEstateIndex];

        if (realEstate.realEstateType == RealEstateType.Land) {
            Land storage sellerLand = lands[_landOwner][realEstate.index];

            if (!sellerLand.isVerified) {
                revert Errors.LandIsNotVerified();
            }

            uint amountToPay = sellerLand.pricePerPlot * sellerLand.numberOfPlots;

            if (IERC20(tokenAddress).balanceOf(msg.sender) < amountToPay) {
                revert Errors.InsufficientDelarTokens();
            }

            if (IERC20(tokenAddress).allowance(msg.sender, address(this)) < amountToPay) {
                revert Errors.InsufficientAllowanceToTransferDelarTokens();
            }

            Land memory buyerLand = Land({
                numberOfPlots: sellerLand.numberOfPlots,
                state: sellerLand.state,
                lga: sellerLand.lga,
                city: sellerLand.city,
                pricePerPlot: sellerLand.pricePerPlot,
                titleNumber: sellerLand.titleNumber,
                isVerified: true,
                forSale: false,
                imageCID: sellerLand.imageCID,
                coFoCID: sellerLand.coFoCID
            });

            lands[msg.sender].push(buyerLand);
            uint landIndex = lands[msg.sender].length - 1;
            realEstates[msg.sender].push(RealEstate({
                realEstateType: RealEstateType.Land,
                index: landIndex
            }));

            INFT(nftAddress).safeTransferFrom(
                _landOwner,
                msg.sender,
                1,
                1,
                ""
            );

            _removeRealEstateFromSale(_landOwner, _realEstateIndex);

            delete lands[_landOwner][realEstate.index];
            delete realEstates[_landOwner][_realEstateIndex];
            
            IERC20(tokenAddress).transferFrom(msg.sender, _landOwner, amountToPay);

            emit Events.LandSold(_landOwner, msg.sender, amountToPay);
        } else if (realEstate.realEstateType == RealEstateType.Property) {
            Property storage sellerProperty = properties[_landOwner][realEstate.index];

            if (!sellerProperty.isVerified) {
                revert Errors.PropertyNotVerified();
            }

            uint amountToPay = sellerProperty.price;

            if (IERC20(tokenAddress).balanceOf(msg.sender) < amountToPay) {
                revert Errors.InsufficientDelarTokens();
            }

            if (IERC20(tokenAddress).allowance(msg.sender, address(this)) < amountToPay) {
                revert Errors.InsufficientAllowanceToTransferDelarTokens();
            }

            Property memory buyerProperty = Property({
                landIndex: sellerProperty.landIndex,
                numberOfRooms: sellerProperty.numberOfRooms,
                numberOfBathrooms: sellerProperty.numberOfBathrooms,
                price: sellerProperty.price,
                isVerified: true,
                forSale: false,
                imageCID: sellerProperty.imageCID
            });

            properties[msg.sender].push(buyerProperty);
            uint propertyIndex = properties[msg.sender].length - 1;
            realEstates[msg.sender].push(RealEstate({
                realEstateType: RealEstateType.Property,
                index: propertyIndex
            }));

            INFT(nftAddress).safeTransferFrom(
                _landOwner,
                msg.sender,
                1,
                1,
                ""
            );

            _removeRealEstateFromSale(_landOwner, _realEstateIndex);

            delete properties[_landOwner][realEstate.index];
            delete realEstates[_landOwner][_realEstateIndex];
            
            IERC20(tokenAddress).transferFrom(msg.sender, _landOwner, amountToPay);

            emit Events.PropertySold(_landOwner, msg.sender, amountToPay);
        }
    }

    function toggleRealEstateForSale(uint _realEstateIndex) external {
        RealEstate storage realEstate = realEstates[msg.sender][_realEstateIndex];

        if (realEstate.realEstateType == RealEstateType.Land) {
            Land storage land = lands[msg.sender][realEstate.index];
            if (land.forSale) {
                _removeRealEstateFromSale(msg.sender, _realEstateIndex);
                land.forSale = false;
            } else {
                realEstatesForSale.push(RealEstateSale({owner: msg.sender, realEstateIndex: _realEstateIndex}));
                land.forSale = true;
            }
        } else if (realEstate.realEstateType == RealEstateType.Property) {
            Property storage property = properties[msg.sender][realEstate.index];
            if (property.forSale) {
                _removeRealEstateFromSale(msg.sender, _realEstateIndex);
                property.forSale = false;
            } else {
                realEstatesForSale.push(RealEstateSale({owner: msg.sender, realEstateIndex: _realEstateIndex}));
                property.forSale = true;
            }
        }
    }

    function toggleRealEstateVerification(uint _realEstateIndex) external {
        RealEstate storage realEstate = realEstates[msg.sender][_realEstateIndex];

        if (realEstate.realEstateType == RealEstateType.Land) {
            Land storage land = lands[msg.sender][realEstate.index];
            land.isVerified = !land.isVerified;
        } else if (realEstate.realEstateType == RealEstateType.Property) {
            Property storage property = properties[msg.sender][realEstate.index];
            property.isVerified = !property.isVerified;
        }
    }

    // getter functions
    function viewAllRealEstateListings() external view returns (RealEstateSale[] memory) {
        return realEstatesForSale;
    }

    function viewOwnerRealEstates() external view returns (RealEstate[] memory) {
        return realEstates[msg.sender];
    }

    struct RealEstateDetails {
        RealEstateType realEstateType;
        uint numberOfPlots;
        uint titleNumber;
        string state;
        string lga;
        string city;
        uint256 pricePerPlot;
        bool isVerified;
        bool forSale;
        string imageCID;
        string coFoCID;
        uint landIndex;
        uint numberOfRooms;
        uint numberOfBathrooms;
        uint256 price;
    }

    function getRealEstateDetails(
        address _owner,
        uint _realEstateIndex
    ) external view returns (RealEstateDetails memory) {
        RealEstate storage realEstate = realEstates[_owner][_realEstateIndex];

        if (realEstate.realEstateType == RealEstateType.Land) {
            Land storage land = lands[_owner][realEstate.index];
            return RealEstateDetails({
                realEstateType: realEstate.realEstateType,
                numberOfPlots: land.numberOfPlots,
                titleNumber: land.titleNumber,
                state: land.state,
                lga: land.lga,
                city: land.city,
                pricePerPlot: land.pricePerPlot,
                isVerified: land.isVerified,
                forSale: land.forSale,
                imageCID: land.imageCID,
                coFoCID: land.coFoCID,
                landIndex: 0,
                numberOfRooms: 0,
                numberOfBathrooms: 0,
                price: 0
            });
        } else if (realEstate.realEstateType == RealEstateType.Property) {
            Property storage property = properties[_owner][realEstate.index];
            return RealEstateDetails({
                realEstateType: realEstate.realEstateType,
                numberOfPlots: 0,
                titleNumber: 0,
                state: "",
                lga: "",
                city: "",
                pricePerPlot: 0,
                isVerified: property.isVerified,
                forSale: property.forSale,
                imageCID: property.imageCID,
                coFoCID: "",
                landIndex: property.landIndex,
                numberOfRooms: property.numberOfRooms,
                numberOfBathrooms: property.numberOfBathrooms,
                price: property.price
            });
        }
        revert("Should not be reached");
    }

    // helper functions
    /**
 * @dev Private helper function to find and remove a real estate from the realEstatesForSale array
 * @param _owner The address of the real estate owner
 * @param _realEstateIndex The index of the real estate in the owner's realEstates array
 */
function _removeRealEstateFromSale(address _owner, uint _realEstateIndex) private {
    for (uint i = 0; i < realEstatesForSale.length; i++) {
        if (realEstatesForSale[i].owner == _owner && realEstatesForSale[i].realEstateIndex == _realEstateIndex) {
            if (i < realEstatesForSale.length - 1) {
                realEstatesForSale[i] = realEstatesForSale[realEstatesForSale.length - 1];
            }

            realEstatesForSale.pop();
            break;
        }
    }
}
}