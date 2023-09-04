



let myUsers=[]
if (localStorage.users != null) {
    myUsers= JSON.parse(localStorage.users)
}
else{
    myUsers=[]
}

console.log(myUsers);
let chick ;
$('#addBtn').click(chickData);
function chickData(e) {
    vild()
    e.preventDefault()
    for (let index = 0; index < myUsers.length; index++) {
        if ($('#useremail').val() == myUsers[index].email) {
            chick = true
            break
        }
        else{
            chick = false
        }
    } 
    if (chick  == true) {
        $('#useremail + p').css('display','block');
        $('#useremail + p').html('mail already exists');
    }
    else{
        addUser(e)
    }
}

function addUser(e) {
    if (validName() == true&&validEmail() ==true &&validPassword()==true ) {
        let user ={
            name:$('#username').val(),
            email:$('#useremail').val(),
            password:$('#userpassword').val(),
        }
        console.log();
        myUsers.push(user)
        console.log(myUsers);
        localStorage.setItem('users', JSON.stringify(myUsers))
        success()
        clr()
        setTimeout( ()=>{
            location.href='login/login.html'
        }, 2000)
    }
    else{
        e.preventDefault()
    } 
}

(function (){
    //valid stayle
    $('#username').on('input', function (e) {

        if (validName()==true) {
            $('#username').css('border-color','green');
            $('#username').addClass('is-valid');
            $('#username').removeClass('is-invalid');
            $('#username + p').css('display','none');
        }
        else{
            $('#username').css('border-color','red');
            $('#username + p').css('display','block');
            $('#username + p').html('The password is incorrect');
            $('#username').addClass('is-invalid');
            $('#username').removeClass('is-valid');
        }

    });
    $('#useremail').on('input', function () {
        if (validEmail()==true) {
            $('#useremail').css('border-color','green');
            $('#useremail').addClass('is-valid');
            $('#useremail').removeClass('is-invalid');
            $('#useremail + p').css('display','none');
        }
        else{
            $('#useremail').css('border-color','red');
            $('#useremail + p').css('display','block');
            $('#useremail').addClass('is-invalid');
            $('#useremail').removeClass('is-valid');
        }
    });

    $('#userpassword').on('input', function () {
        if (validPassword()==true) {
            $('#userpassword').css('border-color','green');
            $('#userpassword').addClass('is-valid');
            $('#userpassword').removeClass('is-invalid');
            $('#userpassword + p').css('display','none');
        }
        else{
            $('#userpassword').css('border-color','red');
            $('#userpassword + p').css('display','block');
            $('#userpassword').addClass('is-invalid');
            $('#userpassword').removeClass('is-valid');

        }
    });
    
}())

function vild() {
    if ($('#username').val() == '') {
        $('#username + p').css('display','block');
        $('#username + p').html('please fill out this field.');
    }
    
    if ($('#useremail').val() == '') {
        $('#useremail + p').css('display','block');
        $('#useremail + p').html('please fill out this field.');
    }
    if ($('#userpassword').val() =='') {
        $('#userpassword + p').css('display','block');
        $('#userpassword + p').html('please fill out this field.');
    }
}

function validName()
{
    var regex =/[a-z]{2,}/ ;
    return  regex.test($('#username').val())
}
function validEmail()
{
    var regex =/^\w+([\.-]?\w+)*@[a-z]{3,9}\.com$/ ;
    return  regex.test($('#useremail').val())
}

function validPassword()
{
    var regex =/\w{3,}/ ;
    return  regex.test($('#userpassword').val())
}

function success() {
    swal({
    title: "success",
    icon:"success",
    timer:"2000"
    });
}
function clr() {
    $('#username').val('')
    $('#useremail').val('')
    $('#userpassword').val('')
}

$('#userpassword,#useremail,#username').on('input', function () {
    if (validName() == true&&validEmail() ==true &&validPassword()==true ) {
    $('#addBtn').css({'display': 'block'});
    }
    else{
        $('#addBtn').css({'display': 'none'});
    }

});