
$(document).ready(function () {
  let userEmail = null
  //get
  $('#loginButton').click(function () {
    const email = $('#emailInput').val()
    const password = $('#passwordInput').val()
    console.log(email, password)
    // kiểm tra email
    if (!email) {
      $('.alert').remove()
      $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Email Không hợp lệ</div>')
      return
    }
    // kiểm tra password
    if (!password) {
      $('.alert').remove()
      $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Password không hợp lệ</div>')
      return
    }

    $.ajax(
      {
        url: "http://localhost:3000/login",
        data: JSON.stringify({
          email,
          password
        }),
        type: 'POST',
        contentType: 'application/json'
      }).done(function (data) {
        if (data.status === 'error') {
          $('.alert').remove()
          $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
        } else {
          localStorage.setItem("id", email)

          console.log(email);
          console.log('đăng nhập thành công');
          window.location.replace('http://127.0.0.1:5500/client/src/components/HomePage/index.html')
        }
        return;
      })

    // $.ajax({
    //   url: "http://localhost:3000/users",
    //   type: 'GET',
    //   contentType: 'application/json'
    // }).done(function (data) {
    //   data.data.forEach(post => {
    //     userEmail = post.email;
    //     console.log(post.email)
    //     return
    //   })
    // })

  })




  $('#signupButton').click(function () {
    window.location.replace('http://127.0.0.1:5500/client/src/components/SignupPage/index.html')
  })
})