function redirect(url){
    var form = document.createElement('form');
    form.style.position = 'absolute';
    form.style.top = '-500px';
    form.style.left = '-500px';
    form.method = 'GET';
    form.action = url;
    document.querySelector('body').appendChild(form);
    form.submit();
}

async function tokenPresence(){
    const result = await fetch('/user/api/checkValidity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if (result.status === 'ok'){
        mainFunc(result);
        // console.log(result);
    } else {
        redirect('/error');
    }
}

function mainFunc(result){
    // alert('Welcome to profile page!!')
    document.querySelectorAll('.navItem')[1].innerHTML = result.user.firstname + '&nbsp;<i class="fas fa-caret-down"></i>';
    document.getElementById('articleUserName').value = result.user.username;
    document.getElementById('usernameDisplay').innerHTML = result.user.username;
}

function logoutFunction(){
    localStorage.clear();
    redirect('/');
}