
$(document).ready(function () {

  var $imagesGrid = $('.images');
  $.ajax({
    url: '/images',
    method: 'get',
    dataType: 'json'
  })
  .done(function (result) {
    result.forEach((user)=> {
      user.images.forEach((image)=> {
        var $div = $('<div>', { 'class': 'grid-item' })
        var $img = $('<img>', { 'src': image.url })
        var $p = $('<p>', { 'text': image.description })

        var $infoDiv = $('<div>', { 'class': 'info-div' })
        var $profileImg = $('<img>', { 'src': user.twitter.profilePic, 'class': 'profile-pic' })
        $infoDiv.append($profileImg)

        $div.append($img)
        $div.append($p)
        $div.append($profileImg)
        $imagesGrid.append($div)
      })


    })


    $imagesGrid.masonry({
      itemSelector: '.grid-item',
    })
  })



})
