const express = require('express');
const fs = require('fs');
const path = require('path');
const { NFTStorage, Blob } = require('nft.storage');
const port = 3042;

const cors = require('cors');

const app = express();

app.use(cors());



// Initialize NFT.Storage client
const client = new NFTStorage({ token: 'YOUR_NFT_STORAGE_API_KEY' });

const databasePath = 'nftDatabase.json';

// Initialize or load the database from a JSON file
let nftDatabase = {};

try {
    const data = fs.readFileSync(databasePath, 'utf8');
    nftDatabase = JSON.parse(data);
} catch (error) {
    console.error(`Error reading or parsing the database file: ${error.message}`);
}

// Save the database to the JSON file
function saveDatabase() {
    fs.writeFileSync(databasePath, JSON.stringify(nftDatabase), 'utf8');
}
// Endpoint for uploading NFT image and metadata
app.post('/upload-nft', async (req, res) => {
    console.log('Request body:', req.body);
    const { nftId, metadata } = req.body;
    const imageBuffer = Buffer.from(req.body.image, 'base64'); // Decode base64 image data

    try {
        // Upload image to NFT.Storage
        metadata.image = new Blob([imageBuffer], { type: 'image/jpeg' }) // Adjust the MIME type as needed
     
        // Upload metadata to NFT.Storage
        const metadataUploadResponse = await client.store({ ...metadata });

        console.log('IPFS URL for the metadata:', metadataUploadResponse.url)
console.log('metadata.json contents:\n', metadataUploadResponse.data)
console.log('metadata.json with IPFS gateway URLs:\n', metadataUploadResponse.embed())

        // Update the database with CIDs
        nftDatabase[nftId] = {
            imageCid: metadataUploadResponse.data.image,
            metadataCid: metadataUploadResponse.url,
        };


        // Save the updated database to the JSON file
        saveDatabase();

        return res.status(200).json({ message: 'NFT uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading to NFT.Storage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to handle ERC-1155 metadata URI format and redirect to IPFS
app.get('/erc1155/:nftId', (req, res) => {
    const { nftId } = req.params;

    // Check if the NFT ID exists in the database
    if (!nftDatabase[nftId]) {
        return res.status(404).json({ error: 'NFT not found.' });
    }

    // Construct ERC-1155 metadata URI
    const ipfsUri = nftDatabase[nftId].metadataCid;

    // Redirect to IPFS URI
    return res.redirect(ipfsUri);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
