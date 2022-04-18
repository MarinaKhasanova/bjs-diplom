"use strict";

const objUser = new UserForm();

objUser.loginFormCallback = (data) => {
  ApiConnector.login(data, (answer) => {
    if (answer.success) {
      location.reload();
    } else 
        objUser.setLoginErrorMessage(answer.error);
  });
} 

objUser.registerFormCallback = (data) => { 
  ApiConnector.register(data, (answer) => {
    if (answer.success) {
      location.reload();
    } else 
        objUser.setRegisterErrorMessage(answer.error);       
  });
}