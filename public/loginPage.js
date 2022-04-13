"use strict";

let objUser = new UserForm();
//console.log(objUser);
objUser.loginFormCallback = (data) => {
    ApiConnector.login(data, (answer) => {
    //console.log(answer);
      if (answer.success) {
        location.reload();}
      else 
        objUser.setLoginErrorMessage(answer.error);});
 } 
//console.log(objUser);

objUser.registerFormCallback = (data) => { 
    ApiConnector.register(data, (answer) => {
       if (answer.success) {
         location.reload();
       }
       else 
        objUser.setRegisterErrorMessage(answer.error);       
    });
}