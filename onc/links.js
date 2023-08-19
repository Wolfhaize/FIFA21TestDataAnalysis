var storedURLs = [];
Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

ticking = false;

function scrapeURLs() {
  // Find all the story links in the reading list page
  const storyLinks = $('h5 a');

  // Loop through each story link and save the href attribute to the storedURLs array
  storyLinks.each((index, link) => {
    storedURLs.push($(link).attr('href'));
  });

  // Remove any duplicates from the storedURLs array
  storedURLs = storedURLs.unique();

  console.log("Links found: " + storedURLs.length);
}

window.addEventListener("scroll", function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      scrapeURLs();
      ticking = false;
    });

    ticking = true;
  }
});

scrapeURLs();

console.log("Links will be captured automatically as you scroll throughthe Wattpad reading list page");
console.log("After completion, paste `copy(storedURLs);` into the console to capture the URLs onto your clipboard automatically."); 