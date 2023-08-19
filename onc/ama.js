const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// read the JSON file with the story data
const storyData = JSON.parse(fs.readFileSync('sto.json'));

// create an empty object to store the user data
const userData = {};

// loop through each story in the story data
storyData.forEach(async (story) => {
  // get the username of the user who wrote the story
  const username = story.user.name;

  // check if we've already looked up this user's data
  if (!userData[username]) {
    try {
      // make an API request to get the user's data
      const response = await fetch(`https://www.wattpad.com/api/v3/users/${username}`);
      const userDataJson = await response.json();

      // check if the user is an ambassador
      if (userDataJson.ambassador) {
        // if so, add the username and ambassador status to the userData object
        userData[username] = { ambassador: true };
      } else {
        // if not, add the username to the userData object with no ambassador status
        userData[username] = { ambassador: false };
      }

      // write the updated userData object to a JSON file
      fs.writeFileSync('ama.json', JSON.stringify(userData));
    } catch (error) {
      console.error(`Error fetching user data for ${username}: ${error}`);
    }
  }
});