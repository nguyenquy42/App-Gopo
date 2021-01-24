$(document).ready(function () {
    //get
    $('#signupBtn').click(function () {
        const lastName = $('#surname').val()
        const firstName = $('#name').val()
        const email = $('#email').val()
        const password = $('#password').val()
        const birthday = $('#birthday').val()
        const gender = $("input[name='optradio']:checked").val();

        if (!lastName) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng điền Họ</div>')
            return
        }

        if (!firstName) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng điền Tên</div>')
            return
        }

        if (!email) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng điền Email</div>')
            return
        }

        if (!password) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng điền Password</div>')
            return
        }

        if (!birthday) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng điền Ngày sinh</div>')
            return
        }

        if (!gender) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng chọn giới tính</div>')
            return
        }

        $.ajax(
            {
                url: "http://localhost:3000/users",
                data: JSON.stringify({
                    email,
                    password,
                    lastName,
                    firstName,
                    email,
                    password,
                    birthday,
                    gender
                }),
                type: 'POST',
                contentType: 'application/json'
            }).done(function (data) {
                if (data.isSuccess) {
                    window.location.replace('http://127.0.0.1:5500/client/src/components/LoginPage/index.html')
                } else {
                    $('.alert').remove()
                    $('.container-fluid').prepend(`<div class="alert alert-warning" role="alert">${data.message}</div>`)
                }
            })
    })
})