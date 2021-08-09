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
    var userDetails = document.querySelectorAll('.userData');

    userDetails[0].innerHTML = result.user.firstname;
    userDetails[1].innerHTML = result.user.lastname;
    userDetails[2].innerHTML = result.user.username;
    userDetails[3].innerHTML = result.user.email;
    document.getElementById('profilePic').src = `../${result.user.profilePic}`;
    // console.log(result.user.profilePic);
}

function logoutFunction(){
    localStorage.clear();
    redirect('/');
}