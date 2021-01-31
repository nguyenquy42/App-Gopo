
$(document).ready(function () {

    //checking
    function checking() {
        if (!localStorage.id) {
            console.log('không có tài khoản')
            window.location.replace('http://127.0.0.1:5500/client/src/components/404Page/index.html')
        } else {
            $(".user-name").prepend(localStorage.user)
            console.log(localStorage.user)
        }
    }
    checking()

    // đăng suẩt
    $('.delteId').click(function () {
        localStorage.clear();
        window.location.replace('http://127.0.0.1:5500/client/src/components/LoginPage/index.html')
    })

    $.ajax({
        url: "http://localhost:3000/users",
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        postData = data.data
        if (data.status === 'error') {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
            console.log(data.data)
            data.data.forEach(post => {
                $(".list-users").prepend(
                    `
                    <li>${post.lastName} ${post.firstName}</li>
                    `
                )
            });
            // data.data.forEach(post => {
            //     if(post.email === localStorage.id){
            //         localStorage.setItem("user", post.lastName+'    '+post.firstName)
            //         localStorage.setItem("idUser", post._id)
            //     }
            // });
        }
    })
})
