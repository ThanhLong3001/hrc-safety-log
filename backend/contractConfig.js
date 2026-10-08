require("dotenv").config();

const path = require("path");

const RPC_URL =
    process.env.RPC_URL
    || "http://127.0.0.1:8545";

// Mạng đang dùng: localhost (mặc định) hoặc sepolia / amoy
const NETWORK =
    process.env.NETWORK
    || "localhost";

// Ưu tiên địa chỉ do scripts/deploy.js ghi ra: blockchain/deployments/<network>.json
// Nếu chưa có file đó thì dùng CONTRACT_ADDRESS trong .env
function readDeployedAddress() {

    try {

        const deployment =
            require(
                path.join(
                    __dirname,
                    "../blockchain/deployments",
                    `${NETWORK}.json`
                )
            );

        return deployment.address;

    } catch (error) {

        return undefined;
    }
}

const CONTRACT_ADDRESS =
    readDeployedAddress()
    || process.env.CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
    throw new Error(
        "Contract address not found. Run scripts/deploy.js or set CONTRACT_ADDRESS in .env"
    );
}

const artifactPath =
    path.join(
        __dirname,
        "../blockchain/artifacts/contracts/HRCSafetyLog.sol/HRCSafetyLog.json"
    );

const contractArtifact =
    require(artifactPath);

console.log(
    `Network: ${NETWORK} | Contract: ${CONTRACT_ADDRESS}`
);

module.exports = {
    RPC_URL,
    NETWORK,
    CONTRACT_ADDRESS,
    ABI: contractArtifact.abi
};
