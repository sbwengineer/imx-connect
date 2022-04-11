let provider;
window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
const signer = provider.getSigner();

async function check_connect() {
    try {
        var balance = await provider.getBalance(await signer.getAddress())
        console.log(balance)
        document.getElementById("btn-connect").innerText = "Connected";
    } catch (err) {
        document.getElementById("btn-connect").innerText = "Connect Wallet";
    }
}

async function connect() {
    if (document.getElementById("btn-connect").innerText === 'Connect Wallet') {
        window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
        const signer = provider.getSigner();
        await check_connect()
    } else {
        await check_connect()
    }
}