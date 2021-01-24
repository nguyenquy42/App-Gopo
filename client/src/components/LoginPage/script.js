
    $(document).ready(function () {
        //get
        $('#loginButton').click(function () {
          const email = $('#emailInput').val()
          const password = $('#passwordInput').val()
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
                window.location.replace('http://127.0.0.1:5500/client/src/components/HomePage/index.html')
              }
            })
        })
  
        $('#signupButton').click(function () {
          window.location.replace('http://127.0.0.1:5500/client/src/components/SignupPage/index.html')
        })
      })