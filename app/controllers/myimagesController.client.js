
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

        $li.append($img)
        $imagesUl.append($li)
      })


    })
  })


})
