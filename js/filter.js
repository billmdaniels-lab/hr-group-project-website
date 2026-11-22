/* ==========================================================================
   BOARD GAME TAG FILTER
   Shows or hides game cards based on which category button is clicked.
   ========================================================================== */

// 1. Grab the HTML elements we need to work with
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.menu-item[data-tags]');
const statusText = document.getElementById('filter-status');

// 2. Define the function that filters the cards
function filterGames(selectedTag, buttonLabel) {
  let visibleCount = 0;

  // Check each game card one by one
  gameCards.forEach((card) => {
    // Read the card's data-tags attribute and split it into an array of words
    // Example: "fast-game card-game" becomes ["fast-game", "card-game"]
    const cardTags = card.dataset.tags.split(' ');

    // Show the card if "all" is selected OR if the card's tags include the clicked tag
    const isMatch = selectedTag === 'all' || cardTags.includes(selectedTag);

    // Toggle the HTML "hidden" attribute (true hides the card, false shows it)
    card.hidden = !isMatch;

    if (isMatch) {
      visibleCount++;
    }
  });

  // 3. Update the helper text below the buttons (also announces changes to screen readers)
  const gameWord = visibleCount === 1 ? 'game' : 'games';

  if (selectedTag === 'all') {
    statusText.textContent = `Showing all ${visibleCount} ${gameWord}`;
  } else {
    statusText.textContent = `Showing ${visibleCount} ${gameWord} for "${buttonLabel}"`;
  }
}

// 4. Attach a click listener to every filter button
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Turn off the active state on all buttons, then turn it on for the clicked one
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');

    // Read the tag name stored in data-filter (e.g., "fast-game") and button text
    const selectedTag = button.dataset.filter;
    const buttonLabel = button.textContent.trim();

    // Run the filter
    filterGames(selectedTag, buttonLabel);
  });
});