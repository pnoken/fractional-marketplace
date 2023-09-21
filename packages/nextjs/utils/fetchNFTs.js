export const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "p3kOEezs6bQ6ZW65h4e88qA-drVgOL4J"
    const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
    };

    if (!collection.length) {

        const fetchURL = `${baseURL}?owner=${wallet}`;

        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
        console.log("fetching nfts for collection owned by address")
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
        console.log("nfts:", nfts)
        setNFTs(nfts.ownedNfts)
    }
}