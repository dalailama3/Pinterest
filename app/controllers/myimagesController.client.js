
$(document).ready(function () {


    function addOrRemoveLike () {
      var $span = $(this).next()
      var spanVal = parseInt($span.text())
      var imageId = $(this).data("imageId")
      var userId = $(this).data("userId")

      $.ajax({
        url: '/images/' + imageId + '/likes',
        method: 'get',
        dataType: 'json'
      })
      .done(function (result) {
        var likes = result.images[0].likes;
        console.log(likes)
        console.log(imageId)
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

  var $imagesGrid = $('.myimages');
  $.ajax({
    url: '/images',
    method: 'get',
    dataType: 'json'
  })
  .done(function (result) {
    result.forEach((user)=> {
      var profileImg = user.twitter.profilePic;
      user.images.forEach((image)=> {
        var $div = $('<div>', { 'class': 'grid-item' })
        var $img = $('<img>', { 'src': image.url })
        var $p = $('<p>', { 'text': image.description })

        var $infoDiv = $('<div>', { 'class': 'info-div' })
        var $profileImg = $('<img>', { 'src': profileImg, 'class': 'profile-pic' })
        $infoDiv.append($profileImg)

        var $deleteDiv = $('<div>', { 'class': 'delete' })
        $deleteDiv.data('id', image._id)



        $deleteDiv.on('click', function () {
          var parent = $(this).parent().parent()
          var imageId = $(this).data('id')
          $.ajax({
            url: `/images/${imageId}`,
            method: 'delete'
          }).done(function (result) {
            parent.remove()
          })
        })

        var $likesDiv = $('<div>', { 'class': 'likes'})

        $likesDiv.data('imageId', image._id)
        $likesDiv.data('userId', user.twitter.id)
        $spanCounter = $('<span>', { 'class': 'likes-count', 'text': image.likes.length})


        $likesDiv.on('click', addOrRemoveLike)



        $infoDiv.append($deleteDiv)
        $infoDiv.append($likesDiv)
        $infoDiv.append($spanCounter)
        $div.append($img)
        $div.append($p)
        $div.append($infoDiv)
        $imagesGrid.append($div)


      })


    })

    $imagesGrid.masonry({
      itemSelector: '.grid-item'
    })

  })



})
