
$(document).ready(function () {

  var $imagesGrid = $('.myimages');
  $.ajax({
    url: '/images',
    method: 'get',
    dataType: 'json'
  })
  .done(function (result) {
    result.forEach((user)=> {
      user.images.forEach((image)=> {
        // urlStr = `url("${image.url}")`
        var $div = $('<div>', { 'class': 'grid-item' })
        var $img = $('<img>', { 'src': image.url })
        var $p = $('<p>', { 'text': image.description })

        var $deleteButton = $('<button>', { text: 'Delete' })
        $deleteButton.data('id', image._id)

        $deleteButton.on('click', function () {
          var parent = $(this).parent()
          var imageId = $(this).data('id')
          $.ajax({
            url: `/images/${imageId}`,
            method: 'delete'
          }).done(function (result) {
            parent.remove()
          })
        })

        $div.append($img)
        $div.append($p)
        $div.append($deleteButton)
        $imagesGrid.append($div)


      })


    })

    $imagesGrid.masonry({
      itemSelector: '.grid-item'
    })

  })



})
