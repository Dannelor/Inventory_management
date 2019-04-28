$('#loginForm').on('submit', function(e) {
  e.preventDefault()

  var username = $('#inputEmail').val()
  var password = $('#inputPassword').val()

  console.log(username, password)
  $.ajax({
    url: '/api/login',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({ username: username, password: password }),
    contentType: 'application/json; charset=utf-8',
    success: function(response) {
      console.log(response)
      location.href = '/'
    },
    error: function() {
      alert(error)
    },
  })

  return false
})
