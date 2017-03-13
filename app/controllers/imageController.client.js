
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


    })


    $imagesGrid.masonry({
      itemSelector: '.grid-item',
    })
  })

  function validateURL(textval) {
      var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
      return urlregex.test(textval);
  }



  $('form').submit(function (event) {
    event.preventDefault()
    console.log('submitting form')

    // var user = $('.hidden').text()
    // var profilePic = JSON.parse(user).profilePic
    var url = $(this).find('input[name="url"]').val()
    console.log(url)

    var description = $(this).find('input[name="description"]').val()
    console.log(description)
    //
    // var isValidUrl = validateURL(url)
    // console.log(isValidUrl)
    //add validation for url
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




})
