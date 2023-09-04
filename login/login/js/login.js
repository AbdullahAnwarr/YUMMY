
let logInUsers =[]
if (localStorage.users != null) {
    logInUsers = JSON.parse(localStorage.users)
}
else{
     logInUsers =[]
}
console.log(logInUsers);
let userWelcome;
let ind;
let password ;
let email ;
$('#btnLogIn').click(login)

function login(e) {
    e.preventDefault()
    chickEmail()
    chickPassword()
    if (password==true && email==true) {
        success()
    }
    else{
        e.preventDefault()
    }
}
function chickEmail(){
    
    for (let index = 0; index < logInUsers.length; index++) {
        if ($('#useremail').val() == logInUsers[index].email) {
            email = true
            userWelcome = logInUsers[index].name
            ind = index
            localStorage.setItem('nameUser',JSON.stringify(userWelcome))
            break
        }
        else if ($('#useremail').val() == '') {
            email = 'empty'
        }
        else{
            email = false
        }
    }
    console.log(email);
    if (email == false || email == undefined )  {
        $('#useremail + p').css('display','block');
        $('#useremail + p').html("The mail is incorrect");
    }
    else if(email == 'empty'){
        $('#useremail + p').css('display','block');
        $('#useremail + p').html("please fill out this field.");
    }
    else{
        $('#useremail + p').css('display','none');
    }
}

function chickPassword(){
        if (ind == undefined  || $('#userpassword').val() == '') {
            $('#userpassword + p').css('display','block');
            $('#userpassword + p').html('please fill out this field.');
        }
        else if ( $('#userpassword').val() == logInUsers[ind].password) {
            password = true

        }
        else{
            password = false
            $('#userpassword + p').css('display','block');
            $('#userpassword + p').html('Password not corrected');
        }
}


function success() {
    swal({
    title: "success",
    icon:"success",
    timer:"2000"
    });
    $('#useremail').val('')
    $('#userpassword').val('')
}
