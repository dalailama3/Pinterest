
$(document).ready(function () {

  var $imagesUl = $('ul.myimages');
  $.ajax({
    url: '/images',
    method: 'get',
    dataType: 'json'
  })
  .done(function (result) {
    result.forEach((user)=> {
      user.images.forEach((image)=> {
        var $li = $('<li>')
        $li.text(image.description)
        var $img = $('<img>', { 'src': image.url })

        var $deleteButton = $('<button>', { text: 'Delete' })
        $deleteButton.data('id', image._id)

        $deleteButton.on('click', function () {
          var li = $(this).parent()
          var imageId = $(this).data('id')
          $.ajax({
            url: `/images/${imageId}`,
            method: 'delete'
          }).done(function (result) {
            li.remove()
          })
        })

        $li.append($img)
        $li.append($deleteButton)
        $imagesUl.append($li)
      })


    })
  })


})
