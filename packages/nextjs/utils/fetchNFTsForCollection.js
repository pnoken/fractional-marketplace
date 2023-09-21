const fetchNFTsForCollection = async () => {
    if (collection.length) {
        var requestOptions = {
            method: 'GET'
        };
        const api_key = "p3kOEezs6bQ6ZW65h4e88qA-drVgOL4J"
        const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
        const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
        const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        if (nfts) {
            console.log("NFTs in collection:", nfts)
            setNFTs(nfts.nfts)
        }
    }
}