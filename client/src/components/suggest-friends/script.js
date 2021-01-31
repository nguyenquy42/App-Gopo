
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
                $(".featured-body").prepend(
                    `
                    <div class="col-lg-4 mb-3">
                        <div class="featured-main bg-white">
                            <div class="featured-main-img">
                                <img class="featured-img" src="../../assets/images/default-user-avatar.png" alt="">
                            </div>
                            <div class="featured-main-content">
                                <h5>${post.lastName} ${post.firstName}</h5>
                                <p>0 người theo dõi</p>
                                <button class="text-center w-100 btn suggest-btn">kết bạn</button>
                            </div>
                        </div>
                    </div>
                    `
                )
            });
        }
    })
})
