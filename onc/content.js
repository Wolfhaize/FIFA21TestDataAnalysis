const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// Replace this with the path to your input file
const inputPath = 'links.json';

// Replace this with the path to your output file
const outputPath = 'sto.json';

// Read in the list of story IDs from the input file
const storyIds = JSON.parse(fs.readFileSync(inputPath));




// Define an async function to retrieve the story content for each ID
async function getStoryContents(storyIds) {
  const storyContents = [];
  for (const storyId of storyIds) {
    const url = `https://www.wattpad.com/api/v3/stories/${storyId}`;
    const response = await fetch(url);
    const content = await response.json();
    storyContents.push(content);
  }
  return storyContents;
}

// Call the async function and save the story content to the output file
getStoryContents(storyIds)
  .then(storyContents => {
    const data = JSON.stringify(storyContents);
    fs.writeFileSync(outputPath, data);
    console.log(`Story content saved to ${outputPath}`);
  })
  .catch(error => {
    console.log(error);
  });