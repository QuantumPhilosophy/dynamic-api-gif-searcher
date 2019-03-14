'use strict'

// Filters array

// Function to populate buttons into the #filter-container div
// Should clear #filter-container div before populating
// Should output: <button type="submit" class="btn btn-light mb-2 mr-1 search-filter">New Filter</button>

// Function to populate cards with images into the #image-container div
// Should clear #image-container div before populating
// Should output the following:
// <div class="col-lg-4">
// <div class="card bg-dark text-white mb-2">
//   <img src="{param}" id="image-{param}" class="card-img-top" alt="{param}" data-animate="{param}" data-still="{param}" data-state="still">
//   <div class="card-body">
//     <h5 class="card-title"></h5>
//     <p class="card-text"></p>
//   </div>
// </div>
// </div>

// Function to make Ajax call to GIPHY
// Should call card population function

// On click listener attached to .search-filter buttons which calls Ajax function with filter value

// On click listener attached to .card-img-top imgs which changes the src and data-state attributes of the img tag

// On click listener attached to #add-new-filter button for adding new search filters
// Should call button population function
// Should event.preventDefault();
// Should clear input with .val('')

// Call function to populate buttons on page-load
