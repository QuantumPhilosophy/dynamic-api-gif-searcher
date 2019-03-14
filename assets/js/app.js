'use strict'

// Filters array
let filters = ['Sunset', 'Lava', 'Clouds', 'Forests', 'Northern Lights']

// Function to populate buttons into the #filter-container div
// Should clear #filter-container div before populating
// Should output: <button type="submit" class="btn btn-light mb-2 mr-1 search-filter">New Filter</button>
function populateButtonContainer () {
  $('#filter-container').empty()
  filters.forEach((item) => {
    const filterButton = $('<button type="submit" class="btn btn-light mb-2 mr-1 search-filter">').text(item)
    $('#filter-container').append(filterButton)
  })
}

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
function populateImageContainer (response) {
  $('#image-container').empty()
  let responseData = response.data
  let idCounter = 0
  responseData.forEach((responseItem) => {
    const imgUrlStill = responseItem.images.fixed_width_still.url
    const imgUrlAnimated = responseItem.images.fixed_width.url
    const imgRating = responseItem.rating
    const imgTitle = responseItem.title
    const cardTextEle = $('<p class="card-text">').text('Rating: ' + imgRating)
    const cardTitleEle = $('<h5 class="card-title">').text(imgTitle)
    const cardBodyEle = $('<div class="card-body">').append(cardTextEle).append(cardTitleEle)
    const cardImgEle = $(`<img src="${imgUrlStill}" id="image-${idCounter}" class="card-img-top" alt="${imgTitle}" data-animate="${imgUrlAnimated}" data-still="${imgUrlStill}" data-state="still">`)
    const cardEle = $('<div class="card bg-dark text-white mb-2">').append(cardImgEle).append(cardBodyEle)
    const columnEle = $('<div class="col-lg-4">').append(cardEle)
    $('#image-container').append(columnEle)
    idCounter++
  })
}

// Function to make Ajax call to GIPHY
// Should call card population function
function callGiphy (filter) {
  const apiKey = 'yvvSg2sbgFC1azO6k0Hbt8XnIOT6jneX'
  let query = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + filter + '&limit=10&ratting=g'

  $.ajax({
    url: query,
    method: 'GET'
  }).then((response) => {
    populateImageContainer(response)
  })
}

// On click listener attached to .search-filter buttons which calls Ajax function with filter value
$(document).on('click', '.search-filter', (event) => {
  event.preventDefault()
  const chosenFilter = event.target.innerText
  callGiphy(chosenFilter)
})

// On click listener attached to .card-img-top imgs which changes the src and data-state attributes of the img tag
$(document).on('click', '.card-img-top', (event) => {
  let imgState = event.target.dataset.state
  let imgTargetId = event.target.id
  if (imgState === 'still') {
    $(`#${imgTargetId}`).attr('src', $(`#${imgTargetId}`).attr('data-animate'))
    $(`#${imgTargetId}`).attr('data-state', 'animate')
  } else {
    $(`#${imgTargetId}`).attr('src', $(`#${imgTargetId}`).attr('data-still'))
    $(`#${imgTargetId}`).attr('data-state', 'still')
  }
})

// On click listener attached to #add-new-filter button for adding new search filters
// Should call button population function
// Should event.preventDefault();
// Should clear input with .val('')
$('#add-new-filter').on('click', (event) => {
  event.preventDefault()
  filters.push($('#new-filter').val())
  $('#new-filter').val('')
  populateButtonContainer()
})

// Call function to populate buttons on page-load
populateButtonContainer()
