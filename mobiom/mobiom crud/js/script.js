



var subscriptionNameInp = document.getElementById('sName');
var subscriptionPriceInp = document.getElementById('sPrice');
var subscriptionCategoryInp = document.getElementById('sCat');
var subscriptionDescriptionInp = document.getElementById('sDesc');
var addBtn = document.getElementById('addBtn');
var resetBtn = document.getElementById('resetBtn');
var updateBtn = document.getElementById('updateBtn');
updateBtn.style.display = "none";
var inputs = document.getElementsByClassName('form-control');
var currentIndex;
var alertName = document.getElementById('alertName');
var alertPrice = document.getElementById('alertPrice');
var alertCate = document.getElementById('alertCate');
var alertDesc = document.getElementById('alertDesc');
var searchNameInput = document.getElementById('searchName');
var searchCateInput = document.getElementById('searchCate');

var subscriptions = [];
if(JSON.parse (localStorage.getItem('subscriptionsList')) != null) {
    subscriptions = JSON.parse (localStorage.getItem('subscriptionsList'));
    displaysubscription();
}

addBtn.onclick = function(){
    for(var i = 0; i < inputs.length; i++){
        if(validsubscriptionName () == true && validsubscriptionPrice () == true && validsubscriptionCate () == true  && issubscriptionExist () != true)
        {
            addsubscription ();
            displaysubscription ();
            resetForm ();
            return 1
        }
        else if(issubscriptionExist ())
        {
            alert('This subscription already exist');
            resetForm();
            return 1;
        }
        else if(inputs[i].value == "")
        {
            alert('There is a field or fields Empty..');
            resetForm();
            return 0;
        }
        else
        {
            alert('The Registration is invalid..');
            resetForm();
            return 0;
        }
    }
}    

resetBtn.onclick = function(){
    resetForm ();
}

updateBtn.onclick = function(){
    updatesubscription();
    displaysubscription();
    resetForm ();
    updateBtn.style.display = "none";
}

function addsubscription (){
    var subscription =
    {
        name : subscriptionNameInp.value,
        price : subscriptionPriceInp.value,
        cate : subscriptionCategoryInp.value,
        desc : subscriptionDescriptionInp.value,
    }
        subscriptions.push(subscription);
        localStorage.setItem('subscriptionsList' , JSON.stringify(subscriptions));
}

function displaysubscription (){
    var row = '';
    for (var i = 0; i < subscriptions.length; i++){
        row += 
        `<tr>
            <td>${i+1}</td>
            <td>${subscriptions[i].name}</td>
            <td>${subscriptions[i].price}</td>
            <td>${subscriptions[i].cate}</td>
            <td>${subscriptions[i].desc}</td>
            <td><button class="btn btn-warning" onclick = "getsubscriptionInfo(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick = "deletesubscription(${i})">Delete</button></td>
        </tr>`
    }
    document.getElementById('myTable').innerHTML = row;
}

function resetForm (){
    for (var i = 0; i < inputs.length; i++){
        inputs[i].value = '';
        inputs[i].classList.remove('is-valid');
        inputs[i].classList.remove('is-invalid');
    }
}

function deletesubscription (index){
    subscriptions.splice(index,1);
    displaysubscription();
    localStorage.setItem('subscriptionsList' , JSON.stringify(subscriptions));
}

function getsubscriptionInfo (index){
    currentIndex = index;
    var currentsubscription = subscriptions[index];
        subscriptionNameInp.value = currentsubscription.name;
        subscriptionPriceInp.value = currentsubscription.price;
        subscriptionCategoryInp.value = currentsubscription.cate;
        subscriptionDescriptionInp.value = currentsubscription.desc;
        updateBtn.style.display = "block";
        addBtn.style.display = 'none';
}

function updatesubscription (){
    var subscription = {
        name : subscriptionNameInp.value,
        price : subscriptionPriceInp.value,
        cate : subscriptionCategoryInp.value,
        desc : subscriptionDescriptionInp.value,
    }
    subscriptions[currentIndex] = subscription;
    localStorage.setItem('subscriptionsList' , JSON.stringify(subscriptions));
    addBtn.style.display = 'inline-block';
}

function searchName(searchText){
    var row = '';
    for (var i = 0; i < subscriptions.length; i++){
        if(subscriptions[i].name.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${subscriptions[i].name}</td>
                <td>${subscriptions[i].price}</td>
                <td>${subscriptions[i].cate}</td>
                <td>${subscriptions[i].desc}</td>
                <td><button class="btn btn-warning" onclick = "getsubscriptionInfo(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deletesubscription(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTable').innerHTML = row;
    }
}

function searchCate(searchText){
    var row = '';
    for (var i = 0; i < subscriptions.length; i++){
        if(subscriptions[i].cate.toLowerCase().includes(searchText.toLowerCase())){
            row += 
            `<tr>
                <td>${i+1}</td>
                <td>${subscriptions[i].name}</td>
                <td>${subscriptions[i].price}</td>
                <td>${subscriptions[i].cate}</td>
                <td>${subscriptions[i].desc}</td>
                <td><button class="btn btn-warning" onclick = "getsubscriptionInfo(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick = "deletesubscription(${i})">Delete</button></td>
            </tr>`
        }
        document.getElementById('myTable').innerHTML = row;
    }
}


function validsubscriptionName (){
    var regexName = /^[A-Z][a-z]{2,10}$/;
    if(regexName.test(subscriptionNameInp.value))
    {
        subscriptionNameInp.classList.add('is-valid');
        subscriptionNameInp.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    }
    else
    {
        subscriptionNameInp.classList.add('is-invalid');
        subscriptionNameInp.classList.remove('is-valid');
        alertName.classList.remove('d-none');
        return false;
    }
}

function validsubscriptionPrice (){
    var regexPrice = /^([0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|10000)$/;
    if(regexPrice.test(subscriptionPriceInp.value))
    {
        subscriptionPriceInp.classList.add('is-valid');
        subscriptionPriceInp.classList.remove('is-invalid');
        alertPrice.classList.add('d-none');
        return true;
    }
    else
    {
        subscriptionPriceInp.classList.add('is-invalid');
        subscriptionPriceInp.classList.remove('is-valid');
        alertPrice.classList.remove('d-none');
        return false;
    }
}

function validsubscriptionCate (){
    if(subscriptionCategoryInp.value.toLowerCase() == subscriptionNameInp.value.toLowerCase())
    {
        subscriptionCategoryInp.classList.add('is-valid');
        subscriptionCategoryInp.classList.remove('is-invalid');
        alertCate.classList.add('d-none');
        return true;
    }
    else
    {
        subscriptionCategoryInp.classList.add('is-invalid');
        subscriptionCategoryInp.classList.remove('is-valid');
        alertCate.classList.remove('d-none');
        return false;
    }
}

function issubscriptionExist (){
    for(var i = 0; i < subscriptions.length; i++){
        if(subscriptions[i].name.toLowerCase() == inputs[0].value.toLowerCase())
        {
            return true;
        }
    }
}

subscriptionNameInp.addEventListener('input',validsubscriptionName);
subscriptionPriceInp.addEventListener('input',validsubscriptionPrice);
subscriptionCategoryInp.addEventListener('input',validsubscriptionCate);
subscriptionDescriptionInp.addEventListener('input',validsubscriptionDesc);

searchNameInput.addEventListener('keyup', function (){
    searchName(this.value);
})

searchCateInput.addEventListener('keyup', function (){
    searchCate(this.value);
})


