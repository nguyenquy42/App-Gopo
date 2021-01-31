
$(document).ready(function () {

    //checking
    function checking() {
        if (!localStorage.id) {
            console.log('không có tài khoản')
            window.location.replace('http://127.0.0.1:5500/client/src/components/404Page/index.html')
        } else {
            $(".user-name").prepend(localStorage.user)
        }
    }
    checking()

    // đăng suẩt
    
    $('.delteId').click(function () {
        localStorage.clear();
        window.location.replace('http://127.0.0.1:5500/client/src/components/LoginPage/index.html')
    })

})