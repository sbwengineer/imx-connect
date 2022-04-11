import {ERC721TokenType, Link} from "@imtbl/imx-sdk";

// ropsten for testnet, change before production
const link = new Link('https://link.ropsten.x.immutable.com');

async function imxLogin() {
    const {address} = await link.setup({}).catch((error) => {
        addLog(`IMX login stopped: ${error}`)
    })

    // persist to local storage
    localStorage.setItem('address', address)
    addLog('Connected as ' + address)
}

async function fetchImxAssets(address) {
    // fetch ntfs of the logged user
    await fetch(`https://api.ropsten.x.immutable.com/v1/assets?user=${address}`)
        .then(response => response.json())
        .then(response => {

            // push nfts in the page
            const nftContainer = document.querySelector('#nfts')
            nftContainer.innerHTML = ''

            response.result.forEach(asset => {
                nftContainer.innerHTML += `
                    <img src="${asset.image_url}"><br>
                    <input type="button" class="asset" value="Burn" data-address="${asset.token_address}" data-id="${asset.token_id}">
                `
            })

            // add event on burn btn
            document.querySelectorAll('.asset').forEach(asset => {
                asset.addEventListener('click', () => {
                    burnNft(asset.dataset.address, asset.dataset.id)
                })
            })
        })
        .catch(err => addLog(err));
}

async function burnNft(tokenAddress, tokenId) {
    // create object to burn the nft
    const asset = [{
        type: ERC721TokenType.ERC721,
        tokenId: tokenId,
        tokenAddress: tokenAddress,
        toAddress: '0x0000000000000000000000000000000000000000' // this is the burn address
    }]

    await link.transfer(asset).then(result => {
        addLog(`token burned: ${result}`)
    }).catch((error) => {
        addLog(`IMX burn stopped: ${error}`)
    })
}

// just for logs on html
function addLog(log) {
    document.querySelector('#logger').innerHTML += log
}

// init scripts (check if we have address in local storage => user already connected before)
let address = localStorage.getItem('address')
if (address) {
    addLog(`Address in local storage: ${address}<br><br>`)
}

// events to interact with the page
document.querySelector('#imx-btn').addEventListener('click', imxLogin)
document.querySelector('#imx-assets').addEventListener('click', () => {
    if (!localStorage.getItem('address')) {
        imxLogin()
    } else {
        fetchImxAssets(localStorage.getItem('address'))
    }
})