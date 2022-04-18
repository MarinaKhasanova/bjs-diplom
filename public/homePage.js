
const objLogoutButton = new LogoutButton();

objLogoutButton.action = () => {
  ApiConnector.logout((answer) => {
	if (answer.success) { 
	  location.reload();
	} else
        console.error(answer.error);
   });
}

ApiConnector.current((answer) => {
  if (answer.success) {
	ProfileWidget.showProfile(answer.data); 
  } 
});

const objRateBoard = new RatesBoard(); 

function getExchangeRate() { 
	ApiConnector.getStocks((answer) => {
        if (answer.success) {
			objRateBoard.clearTable(); 
			objRateBoard.fillTable(answer.data);  
		} 
	});
}

getExchangeRate();
setInterval(getExchangeRate, 60000); 

const objMoneyManager = new MoneyManager();

objMoneyManager.addMoneyCallback = ((data) => { 
  ApiConnector.addMoney(data, (answer) => {
    if (answer.success) {
	  ProfileWidget.showProfile(answer.data);  
	  objMoneyManager.setMessage(true, "Баланс пополнен");
	} else 
			objMoneyManager.setMessage(false, answer.error);		
  })
})

objMoneyManager.conversionMoneyCallback = ((data) => {
  ApiConnector.convertMoney(data, (answer) => { 
    if (answer.success) {
      ProfileWidget.showProfile(answer.data);
      objMoneyManager.setMessage(true, "Валюта конвертирована");
     } else 
         objMoneyManager.setMessage(false, answer.error);
  })
})

objMoneyManager.sendMoneyCallback = ((data) => {
  ApiConnector.transferMoney(data, (answer) => { 
	if (answer.success) {
	  ProfileWidget.showProfile(answer.data);
	  objMoneyManager.setMessage(true, "Валюта переведена");
	} else 
        objMoneyManager.setMessage(false, answer.error);
  })
})
 
const objFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites = ((answer) => {
  if (answer.success) {
    objFavoritesWidget.clearTable();
    objFavoritesWidget.fillTable(answer.data);
    objMoneyManager.updateUsersList(answer.data); 
  }
});

objFavoritesWidget.addUserCallback = ((data) => {
  ApiConnector.addUserToFavorites(data, (answer) => {
    if (answer.success) {
	  objFavoritesWidget.clearTable();
	  objFavoritesWidget.fillTable(answer.data);
	  objMoneyManager.updateUsersList(answer.data);
	  objFavoritesWidget.setMessage(true, "Пользователь добавлен");
	} else 
		objFavoritesWidget.setMessage(false, answer.error); 
  })
})

objFavoritesWidget.removeUserCallback = ((data) => {
  ApiConnector.removeUserFromFavorites(data, (answer) => {
	if (answer.success) {
	  objFavoritesWidget.clearTable();
	  objFavoritesWidget.fillTable(answer.data);
	  objMoneyManager.updateUsersList(answer.data);
	  objFavoritesWidget.setMessage(true, "Пользователь удален");
	} else 
			objFavoritesWidget.setMessage(false, answer.error);
  })
})