/* ==========================================================================
   SHARED MENU TAG FILTER
   Works on both index.html (food/drinks) and boardgames.html (board games).
   ========================================================================== */

// 1. Grab the HTML elements we need to work with
const filterButtons = document.querySelectorAll('.filter-btn');
const filterCards = document.querySelectorAll('.menu-item[data-tags]');
const menuSections = document.querySelectorAll('.menu-section');
const statusText = document.getElementById('filter-status');

// Read custom labels if provided in HTML; default to "game"/"games" for boardgames.html
const singularLabel = statusText.dataset.singular || 'game';
const pluralLabel = statusText.dataset.plural || 'games';

// 2. Define the function that filters the cards and hides empty sections
function filterItems(selectedTag, buttonLabel) {
  let visibleCount = 0;

  // Check each card one by one
  filterCards.forEach((card) => {
    // Split space-separated tags into an array (e.g. ["game-friendly"])
    const cardTags = card.dataset.tags.split(' ');

    // Show the card if "all" is selected OR if its tags include the clicked filter
    const isMatch = selectedTag === 'all' || cardTags.includes(selectedTag);

    // Toggle the HTML "hidden" attribute
    card.hidden = !isMatch;

    if (isMatch) {
      visibleCount++;
    }
  });

  // Hide any section heading whose cards are all currently hidden
  menuSections.forEach((section) => {
    const sectionCards = section.querySelectorAll('.menu-item[data-tags]');
    if (sectionCards.length > 0) {
      const hasVisibleCard = section.querySelector('.menu-item[data-tags]:not([hidden])');
      section.hidden = !hasVisibleCard;
    }
  });

  // 3. Update the helper text below the buttons
  const itemWord = visibleCount === 1 ? singularLabel : pluralLabel;

  if (selectedTag === 'all') {
    statusText.textContent = `Showing all ${visibleCount} ${itemWord}`;
  } else {
    statusText.textContent = `Showing ${visibleCount} ${itemWord} for "${buttonLabel}"`;
  }
}

// 4. Attach a click listener to every filter button
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Turn off the active state on all buttons, then activate the clicked one
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');

    const selectedTag = button.dataset.filter;
    const buttonLabel = button.textContent.trim();

    filterItems(selectedTag, buttonLabel);
  });
});