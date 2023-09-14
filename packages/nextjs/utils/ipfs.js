const {NFTStorage} = require('nft.storage');

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.NFT_STORAGE_API_KEY

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
  const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

async function storeExampleNFT() {
  const image = await getExampleImage()
  const nft = {
    image, // use image Blob as `image` field
    name: "NFT.Storage",
    description: "Where is it all being stored?",
    properties: {
      type: "blog",
      authors: [{ name: "David Choice" }],
      content: {
        "text/markdown": " the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
      }
    }
  }

  const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc0OTkyMTc5NGRGNTlCMERERWEyOTAxMjQ5ODY4MmQ3NTk3MGJBNTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NDYzOTEwMjI1OSwibmFtZSI6ImZyYWN0aW9uYWwtbWFya2V0cGxhY2UifQ.6My1vjtwwvjVjBtB2EDqLqdNFnGoyxhI-vt21Jd6YiI' })
  const dddd = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', dddd.url)
}

storeExampleNFT()