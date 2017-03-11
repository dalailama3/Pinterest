
$(document).ready(function () {

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


        $infoDiv.append($deleteDiv)
        $infoDiv.append($likesDiv)
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
