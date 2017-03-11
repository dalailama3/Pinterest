
$(document).ready(function () {

  function updateImageLikes () {

  }

  function addOrRemoveLike () {
    var $span = $(this).next()
    var id = $(this).data("id")

    $.ajax({
      url: '/images/' + id + '/likes',
      method: 'get',
      dataType: 'json'
    })
    .done(function (result) {
      var likes = result.images[0].likes;
      if (likes.indexOf(id) === -1) {

        $.ajax({
          url: '/images/' + id + '/addLike',
          method: 'get'
        }).done(function () {
          var spanVal = parseInt($span.text())
          $span.text(spanVal + 1)
        })
      } else {

        $.ajax({
          url: '/images/' + id + '/removeLike',
          method: 'get'
        }).done(function () {
          $span.text(spanVal - 1)
        })
      }
    })
  }

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
        var $likesDiv = $('<div>', { 'class': 'likes'})

        $likesDiv.data('id', image._id)
        $spanCounter = $('<span>', { 'class': 'likes-count', 'text': image.likes.length})

        $likesDiv.on('click', addOrRemoveLike)

        $infoDiv.append($profileImg)
        $infoDiv.append($likesDiv)
        $infoDiv.append($spanCounter)
        $div.append($img)
        $div.append($p)
        $div.append($infoDiv)

        $imagesGrid.append($div)
      })


    })


    $imagesGrid.masonry({
      itemSelector: '.grid-item',
    })
  })



})
