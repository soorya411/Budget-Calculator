var family="";

function signup(){

    House_Num = reg_number.value;
    Owner_Name = reg_owner.value;
    No_Members = reg_member.value;
    Password = reg_pswd1.value;
    Re_password = reg_pswd2.value;
    balance = 0; 
    if(House_Num=="" || Owner_Name=="" || No_Members=="" || Password=="" || Re_password==""){
        alert("Please fill all fields");
    }
    else{
        family={
            House_Num,
            Owner_Name,
            No_Members,
            Password,
            balance
        }
        
        if(House_Num in localStorage){
            alert("Account Already Exist");
        }
        else if(Password===Re_password){
            
            localStorage.setItem(House_Num,JSON.stringify(family));
            alert("Registered Successfully");
            window.location="index.html";
        }
        else{
            alert("Password didnt match");
            console.log(Password); 
            console.log(Re_password);
        }
    }
    
}

function Login(){
     // Get the values entered by the user for house number and password
    HouseNum = log_number.value; 
    loginPassword = log_pswd.value;

    // Check if either the house number or password is empty
    if(HouseNum=="" || loginPassword==""){
        alert("Please Enter House number and Password");
    }
    else if(HouseNum in localStorage){
         // Check if the entered house number exists in the local storage
        // Retrieve the family information from local storage
        family = JSON.parse(localStorage.getItem(HouseNum));
        // Check if the entered password matches the stored password for the given house number
        if(family.Password==loginPassword){  

            alert("Login Successfull");
            // Set session storage items with information about the logged-in user
            flag=1;
            sessionStorage.setItem('OName',family.Owner_Name);
            sessionStorage.setItem('hnum',family.House_Num);
            sessionStorage.setItem('nom',family.No_Members);
            sessionStorage.setItem('pas',family.Password);
            sessionStorage.setItem('balance',family.balance);
            window.location.href = 'main.html';
        }
        else{
            alert("Incorrect Passsword");
        }
    }
    else{
        alert(`${HouseNum} is not present`);
    }
}


Owner_Name = sessionStorage.getItem('OName');
House_Num = sessionStorage.getItem('hnum');
No_Members = sessionStorage.getItem('nom');
Password = sessionStorage.getItem('pas');
balance = sessionStorage.getItem('balance');
family = JSON.parse(localStorage.getItem(House_Num));
slide.innerHTML = `Welcome ${Owner_Name} and Family`;
getBal(balance);
// ...............income..........................................
    function Add(){
        
        var credit_type= c_type.value;
        var credit_money=parseFloat(c_money.value);
        if(credit_type=="" || credit_money==""){
            alert("Please Enter Description and Income")
        }
        else{
            balance = sessionStorage.getItem('balance');
            console.log(`Balance Before : ${balance}`);
            balance=parseFloat(balance)+credit_money;
            sessionStorage.setItem('balance',balance);
            console.log(balance);
            family={
                House_Num,
                Owner_Name,
                No_Members,
                Password,
                balance
            }
            localStorage.setItem(House_Num,JSON.stringify(family));
            getBal(balance);

            var table = document.getElementById("income_table");

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(2);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            // Add some text to the new cells:
            cell1.innerHTML = credit_type;
            cell2.innerHTML = credit_money;
            cell3.innerHTML = balance;

            
        }
    }
    function Expense(){
        var expense_type=ex_type.value;
        var expense_money=parseFloat(ex_money.value);
        if(expense_type=="" || expense_money==""){
            alert("Please Fill the Description and Expense...");
        }
        else{
            balance = sessionStorage.getItem('balance');
            balance=parseFloat(balance)-expense_money;
            sessionStorage.setItem('balance',balance);
            family={
                House_Num,
                Owner_Name,
                No_Members,
                Password,
                balance
            }
            localStorage.setItem(House_Num,JSON.stringify(family));
            getBal(balance);
            var table = document.getElementById("expense_table");

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(2);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2)

            // Add some text to the new cells:
            cell1.innerHTML = expense_type;
            cell2.innerHTML = expense_money;
            cell3.innerHTML = balance;
        }
}

function getBal(balance){
    
    if(balance>2000){
        bal.innerHTML=`                                     <img src="https://thumbs.dreamstime.com/b/family-budget-calculator-composition-isometric-home-planning-income-expenses-people-vector-illustration-237598163.jpg" style="width: 100px; " alt="logo">
                                   
        <h4 style=" color :#dd3675"> Your Savings is : <p style="padding-top:10px" >Rs. ${balance}/-</p> </h4>`;
        alt.innerHTML =``;
    }
    else{
            bal.innerHTML=`                                    <img src="https://thumbs.dreamstime.com/b/family-budget-calculator-composition-isometric-home-planning-income-expenses-people-vector-illustration-237598163.jpg" style="width: 100px; " alt="logo">
            <h4 style=" color :#dd3675"> Your Savings is : <p style="padding-top:10px">Rs. ${balance}/-</p> </h4>`;
            alt.innerHTML =`<p style="color:#dd3675; paddin-top:20px;">Hey ${Owner_Name}, please Control Your Expenditure......</p>`;
        }    
    }

    function Logout(){

        const response = confirm("Are you sure you want to Logout?");
        if(response){
            window.location="index.html";
        }
         

    }