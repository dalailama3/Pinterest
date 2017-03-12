
$(document).ready(function () {


  function addOrRemoveLike () {
    var $span = $(this).next()
    var spanVal = parseInt($span.text())
    var imageId = $(this).data("imageId")
    var userId = $(this).data("userId")
    // console.log('image id is: ', imageId)
    // console.log('user id is: ', userId)

    $.ajax({
      url: '/images/' + imageId + '/likes',
      method: 'get',
      dataType: 'json'
    })
    .done(function (result) {
      var likes = result.images[0].likes;
      console.log(likes)
      if (likes.indexOf(userId) === -1) {

        $.ajax({
          url: '/images/' + imageId + '/addLike',
          method: 'get'
        }).done(function () {
          $span.text(spanVal + 1)
        })
      } else {

        $.ajax({
          url: '/images/' + imageId + '/removeLike',
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

        $likesDiv.data('imageId', image._id)
        $likesDiv.data('userId', user.twitter.id)
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



  $('form').on('submit', function (event) {
    // var $imagesGrid = $('.grid')
    var user = $('.hidden').text()
    var profilePic = JSON.parse(user).profilePic
    event.preventDefault()
    var children = $(this).children()
    var url = $(children[0]).val()
    var description = $(children[1]).val()
    if (url.length > 0 && description.length > 0) {
      $.ajax({
        url: '/images',
        method: 'post',
        data: {
          url: url,
          description: description
        },
        dataType: 'json'
      }).done(function (result) {
        //add new image to the DOM
        location.reload()




      })
    }

  })



})
