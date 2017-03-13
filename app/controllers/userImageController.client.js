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
    .done(function (images) {
      var likes;
      images.forEach((image)=> {
        if (image._id === imageId) {
          likes = image.likes
        }
      })

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
  var images = $('.userImages').text();


  var user = $('.user').text()
  user = JSON.parse(user)

  images = JSON.parse(images)

  images.forEach((image)=> {

        var $div = $('<div>', { 'class': 'grid-item' })
        var $img = $('<img>', { 'src': image.url })
        var $p = $('<p>', { 'text': image.description })

        var $infoDiv = $('<div>', { 'class': 'info-div' })

        var $profileImg = $('<img>', { 'src': user.twitter.profilePic, 'class': 'profile-pic'})


        var $likesDiv = $('<div>', { 'class': 'likes'})

        $likesDiv.data('imageId', image._id)

        if ($('.signedInUser').length) {
          var signedInUserTwitterId = JSON.parse($('.signedInUser').text()).id
          $likesDiv.data('userId', signedInUserTwitterId)

        }
        $spanCounter = $('<span>', { 'class': 'likes-count', 'text': image.likes.length})

        $likesDiv.on('click', addOrRemoveLike)

        $("img").bind("error",function(){
          // Replacing image source
          $(this).attr("src","/public/img/noimage.png");

         });


        $infoDiv.append($profileImg)
        $infoDiv.append($likesDiv)
        $infoDiv.append($spanCounter)
        $div.append($img)
        $div.append($p)
        $div.append($infoDiv)

        $imagesGrid.append($div)
    })


    $imagesGrid.masonry({
      itemSelector: '.grid-item',
    })


  $('form').submit(function (event) {
    event.preventDefault()
    console.log('submitting form')

    // var user = $('.hidden').text()
    // var profilePic = JSON.parse(user).profilePic
    var url = $(this).find('input[name="url"]').val()
    console.log(url)

    var description = $(this).find('input[name="description"]').val()
    console.log(description)

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
        location.reload();
      })
    }

  })

});
