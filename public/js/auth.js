const miFormulario = document.querySelector('form');


const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8081/api/auth/'
            : 'http://localhost:8081/api/auth/' //cambiar por link del server ya montado

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};
    
    for(let el of miFormulario.elements){
        if(el.name.length > 0)
            formData[el.name] = el.value
    }

    fetch(url + 'login',{ //envio de data como si fuera postman
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(resp => resp.json())
    .then(data =>{
      /*   console.log(formData) */
        localStorage.setItem('token',data.token);
        window.location = 'chat.html';
        console.log(data)
    })
    .catch(err => {
       /*  console.log(formData) */
        console.log(err)
    })
})


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.

    //GOOGLE TOKEN : ID_TOKEN
   /*  const responsePayload = decodeJwtResponse(response.credential); */
    const body = {id_token: response.credential}

    fetch(url + 'google',{
        method: 'POST',
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
     .then(resp => resp.json())
     /* .then(resp => {console.log(resp),localStorage.setItem('email',resp.usuario.correo)}) */
     .then(({token}) =>{
        localStorage.setItem('token',token);
        window.location = 'chat.html';
        /* console.log(token); */
     })
     .catch(console.warn)
    /* console.log('Id Token : ', response.credential); */
 }

 const button = document.getElementById('googleSingOut');
 button.onclick = () =>{
     console.log(google.accounts.id);
     google.accounts.id.disableAutoSelect()
     google.accounts.id.revoke(localStorage.getItem('email'),done =>{
        localStorage.clear();
        location.reload();
     });
 }