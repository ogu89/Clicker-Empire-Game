

class Item{
    constructor(name, type, maxpurchases, price, profit, quantity, imageUrl){
        this.name = name;
        this.type = type;
        this.maxpurchases = maxpurchases;
        this.price = price;
        this.profit = profit;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }


    getItem(boughtQty){
        this.quantity += boughtQty;
    }

    increaseStockPrice(){

        this.price =Math.floor(this.price * (1+ 0.1) * 10)/10 ;
  
    }



};







class User{
    constructor(name, age, day, money, burger, purchasedItem){
        this.name = name;
        this.age = age;
        this.day = day;
        this.money = money;
        this.burger = burger;
        this.purchasedItem = purchasedItem;
    }

    daysPass(){
        this.day ++;
        if(this.day % 366 == 0) this.age++;
        return this.day;

    }

    clickBurger(clickProfit){
        this.burger ++;
        this.money += clickProfit;

    }

    payMoney(price){
        this.money -= price;
    }

    getMoneyPerSec(profit){

        //console.log(profit)

        
        this.money =     Math.floor((this.money + profit) * 100) /100;
        
    }


    

    

    

    

    
}




class View{
    static makeNameForm(){
        let container = document.createElement("div"); 
            container.classList.add("d-flex", "align-items-center", "col-md-7", "col-10")
        container.innerHTML =
        `   <div class="col-12 text-center p-3">
                <h1 class="color-blue mb-5">Clicker Empire Game</h1>
                <img width="300px" alt="Empire" class="img-fluid" src="https://cdn-icons-png.flaticon.com/512/1752/1752084.png">
                <form id="name-form"  onsubmit="Controller.checkButton(); event.preventDefault()" >
                    <div class="form-group pt-3">
                        <input type="text" id="userName" name="userName" class="form-control" placeholder="Type your name"  required>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="col-6 pl-0" >
                            <button type="submit"  class="btn btn-danger col-12 new-btn" value="new"  >New Game</button>
                        </div>
                        <div class="col-6 pr-0">
                            <button type="submit" class="btn btn-primary col-12 load-btn"  value="load" >Load Game</button>
                        </div>
                    </div>
                </form>
            </div>
        `;

        

        return container;
        
    }


    static mainPage(userAccount){

        let container = document.createElement("div");
        container.classList.add("d-flex", "justify-content-center", "col-12",  "bg-blue", "py-3");

        container.innerHTML = 
        `
        <div class="d-flex row px-3 vw-100">
		    <div id="leftMain" class="col-4 bg-gray py-3 "></div>

		    <div class="col-8 d-flex flex-column">
			    <div id="userInfo" class=" d-flex flex-column  bg-gray pt-2  mb-5 text-center text-white"></div>
			    <div id="itemSelection" class="col bg-gray px-3 py-3  overflow-auto"></div>
			    <div id="saveLoad" ></div>
		    </div>
	    </div>
        `;

        Controller.config.leftMain = container.querySelectorAll("#leftMain")[0];
        Controller.config.userInfo = container.querySelectorAll("#userInfo")[0];
        Controller.config.itemSelection = container.querySelectorAll("#itemSelection")[0];
        Controller.config.saveLoad = container.querySelectorAll("#saveLoad")[0];

        
        


        Controller.config.leftMain.append(View.leftMainPage(userAccount, Controller.calculateProfitPerSec(userAccount)));
        Controller.config.userInfo.append(View.userInfomation(userAccount));
        Controller.config.itemSelection.append(View.itemSelector(userAccount));
        Controller.config.saveLoad.append(View.saveLoadBtn(userAccount));









        return container;

       
        



        
    }

    static leftMainPage(userAccount, totalPerSec){
        let container = document.createElement("div");
        let flipMachine = Controller.itemList.find(object => object.type === "Skill");
        let clickProfit = 0.25 + (0.25 * flipMachine.quantity);


        //console.log(flipMachine);

        container.innerHTML =
        `
        <div class=" bg-blue text-center text-white py-4 mb-5">
            <h2 class="mb-2" id="burgerNum">${userAccount.burger} Burgers</h2>
            <h2 class="mb-2">$${clickProfit} /click</h2>
            <h2>$${totalPerSec} /days</h2>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <img class="img-fluid pt-5 btnHover" id="burgerBtn" width="300"  src="https://cdn-icons-png.flaticon.com/512/1858/1858002.png">
        </div>
        `;
        
        let burgerBtn = container.querySelectorAll("#burgerBtn")[0];

        burgerBtn.addEventListener("click", function(){
            userAccount.clickBurger(clickProfit);
            container.querySelectorAll("#burgerNum")[0].innerHTML = `${userAccount.burger} Burgers`
            Controller.updateUserInfoView(userAccount);
        })

        return container;

    }

    static userInfomation(userAccount){
        let container = document.createElement("div");
        //container.classList.add("d-flex", "flex-column", "align-items-center", "bg-dark", "py-2", "mb-5", "text-center", "text-white");

        container.innerHTML = 
        `
        <div class="d-flex col px-2 flex-wrap">
                     
            <div class="col-12 col-sm bg-blue mr-1 mb-1">
                <h4>${userAccount.name}</h4>
            </div>
            <div class="col-12 col-sm  bg-blue mb-1">
                <h4>${userAccount.age} yrs old</h4>
            </div>
        </div>
                   
        <div class="d-flex col px-2 flex-wrap">
            <div class="col-12 col-sm bg-blue mr-1 mb-1">
                <h4>${userAccount.day} days</h4>
            </div>
            <div class="col-12 col-sm bg-blue mb-1">
                <h4>$${userAccount.money}</h4>
            </div>
        </div>
        `;

        return container;
        
                        
                        
                    
    }

    static itemSelector(userAccount){
        let container = document.createElement("div");
        //container.classList.add("col", "bg-dark", "p-3",  "overflow-auto")
        
        for(let i = 0; i < Controller.itemList.length; i++){
            let curr = Controller.itemList[i];
            let profitString = curr.type == "Skill" ? `+ $${curr.profit} /click` : curr.type == "Investment" ? `+ ${curr.profit}% /sec` :  `+ $${curr.profit} /sec`;
            

            container.innerHTML+=
            `
            <div class="bg-blue d-flex align-items-center justify-content-between p-2 mb-2 text-white itemBorder" id="item${i}">
                <img class="d-none d-sm-block" width="150" src="${curr.imageUrl}">
                <div class=" flex-column">
                    <div>
                        <h3>${curr.name}</h3>
                        <h5>$${curr.price}</h5>
                        
                    </div>
                </div>
                <div class="flex-column">
                    <h3 class="col-2">${curr.quantity}</h3>
                    <h5 class="green-color">${profitString}</h5>
                </div>
            </div>
            `;
        
        }

        for(let i = 0; i < Controller.itemList.length; i++){
            let selectedItem = container.querySelectorAll("#item" + i.toString())[0];

            selectedItem.addEventListener("click", function(){
                container.innerHTML = ""
                container.append(View.itemDetail(Controller.itemList[i], userAccount));
                

            })
        }   

        return container;
        
    }

    static itemDetail(itemObject, userAccount){
        let container = document.createElement("div");
        let itemDescription = itemObject.type == "Skill" ? `Get $${itemObject.profit} /click` : itemObject.type == "Real estate" ? `Get $${itemObject.profit} /sec` : `Add up all ${itemObject.name} purchases and get ${itemObject.profit}% per second.`;

        container.innerHTML =
        `
                <div class="bg-blue d-flex flex-column  p-3 text-white" >
                    <div class="d-flex flex-row justify-content-between ">
                        <div class="col-sm-6 d-flex flex-column align-itmes-center justify-content-center">
                            <h3>${itemObject.name}</h3>
                            <h5>Max purchases: ${itemObject.maxpurchases}</h5>
                            <h5>Price: $${itemObject.price}</h5>
                            <h5 class="green-color">${itemDescription}</h5>
                        </div>
                        <div class="col-sm-6 d-sm-block d-none ">
                            <img class="img-fluid"   src="${itemObject.imageUrl}">
                        </div>
                    </div>

                    <h5>How many would you like to buy</h5>
                    <div class="form-group">
                        <input type="number" class="form-control" id="inputQuantity" min="0" value="0">
                    </div>
                    <h5 id="total-price" class="text-right">total:$ 0</h5>
                    <div class="d-flex justify-content-between">
                        <div class="col-6 pl-0">
                            <button class="btn btn-outline-primary  col-12 back-btn">Go Back</button>
                        </div>
                        <div class="col-6 pr-0">
                            <button class="btn btn-primary col-12 purchase-btn">Purchase</button>
                        </div>
                    </div>
                    
                </div>
        `;

        let purchaseQty = container.querySelectorAll("#inputQuantity")[0];
        let totalPrice = container.querySelectorAll("#total-price")[0];


        purchaseQty.addEventListener("change", function(){
            totalPrice.value = itemObject.price * purchaseQty.value;
            totalPrice.innerHTML = `total:$ ${totalPrice.value}`;
        })

        let backBtn = container.querySelectorAll(".back-btn")[0];
        backBtn.addEventListener("click", function(){
            Controller.updateItemSelectionView(userAccount);
        })



        let purchaseBtn = container.querySelectorAll(".purchase-btn")[0];
        purchaseBtn.addEventListener("click", function(){
            console.log(typeof totalPrice.value)
            if(parseInt(purchaseQty.value)  == 0) alert("Invalid Number");
            else if(totalPrice.value > userAccount.money) alert("You don't have enough money.");
            else Controller.buyItem(userAccount, itemObject, parseInt(purchaseQty.value));
        })


        return container;



    }

    



    static saveLoadBtn(userAccount){
        let container = document.createElement("div");
        container.classList.add("d-flex", "justify-content-end", "mt-2");
        container.innerHTML = 
        `
        <div id="reset-btn" class=" p-1 mr-3 btnHover ">
            <i class="fas fa-undo fa-3x   color-orange"></i>
        </div>

        <div id="save-btn" class=" p-1 btnHover ">
            <i class="far fa-save fa-3x  color-orange"></i>
        </div>
        `;

        let resetBtn = container.querySelectorAll("#reset-btn")[0];
        let saveBtn = container.querySelectorAll("#save-btn")[0];

        resetBtn.addEventListener("click", function(){
            if (confirm('Reset all your data?')) Controller.resetGameData(userAccount); 
        })

        saveBtn.addEventListener("click", function(){
            alert("Saved your data. Please put the same name when you login.");
            Controller.saveGameData(userAccount);
        })
        


        return container;

        
    }

    



}


class Controller{
    
    static itemList = [
        new Item("Flip machine", "Skill", 500, 150, 0.25, 0, "https://cdn-icons-png.flaticon.com/512/823/823215.png"),
        new Item("ETF Stock", "Investment", 0, 3000, 0.1, 0, "https://cdn-icons-png.flaticon.com/512/2910/2910311.png"),
        new Item("ETF Bonds", "Investment", 0, 3000, 0.07, 0, "https://cdn-icons-png.flaticon.com/512/2910/2910257.png" ),
        new Item("Lemonade Stand", "Real estate", 1000, 300, 0.3, 0, "https://cdn-icons-png.flaticon.com/512/941/941769.png"),
        new Item("Ice Cream Truck", "Real estate", 500, 1000, 1.2, 0, "https://cdn-icons-png.flaticon.com/512/3217/3217048.png"),
        new Item("House", "Real estate", 100, 200000, 320, 0, "https://cdn-icons-png.flaticon.com/512/2413/2413469.png"),
        new Item("TownHouse", "Real estate", 100, 400000, 640, 0, "https://cdn-icons-png.flaticon.com/512/5347/5347373.png"),
        new Item("Mansion", "Real estate", 20, 2500000, 5000,  0, "https://cdn-icons-png.flaticon.com/512/1555/1555387.png"),
        new Item("Industrial Space", "Real estate", 10, 10000000, 22000, 0, "https://cdn-icons-png.flaticon.com/512/2942/2942169.png"),
        new Item("Hotel Skyscraper", "Real estate", 5, 100000000, 250000, 0, "https://cdn-icons-png.flaticon.com/512/2760/2760913.png"),
        new Item("Bullet-Speed Sky Railway", "Real estate", 1, 100000000000, 300000000, 0, "https://cdn-icons-png.flaticon.com/512/2159/2159692.png")
    
    
    ];   

    static ETFStockTotal = 0;
    static interval = null;

    

    static config;

    


    static checkButton(){
        let clickcedButton = document.activeElement['value'];
        const inputName = document.getElementById("name-form").querySelectorAll(`input[name="userName"]`)[0].value;
        if (clickcedButton == "new") Controller.initializeUserAccount(inputName);
        if(clickcedButton == "load") Controller.loadGameData(inputName);
    }

    static initializeApp (){
        

        let target = document.getElementById("target");
        target.innerHTML = 
        `
        <div id="page" class="vh-100 bg-gray d-flex flex-column justify-content-center align-items-center p-4 ">
            
        </div>
        `;


        /*

        <div id="main" class="d-flex justify-content-center col-12  background py-3">
	            <div class="d-flex row px-2">
		            <div id="leftMain" class="col-sm-5 bg-dark py-3"></div>

		            <div class="col-sm-7 d-flex flex-column">
			            <div id="userInfo" ></div>
			            <div id="itemSelection"></div>
			            <div id="saveLoad"></div>
		            </div>
	            </div>
            </div> 
        */

        Controller.config = {
            page : document.getElementById("page")
            /*
            Controller.config.leftMain = container.querySelectorAll("#leftMain")[0];
            Controller.config.userInfo = container.querySelectorAll("#userInfo")[0];
            Controller.config.itemSelection = container.querySelectorAll("#itemSelection")[0];
            Controller.config.saveLoad = container.querySelectorAll("#saveLoad")[0];
            */
        }
        


        Controller.config.page.append(View.makeNameForm())
        
        

        
    }

    static initializeUserAccount(name){
        
        let userAccount = new User(
            name,
            20,
            0,
            50000,
            0,
            Controller.itemList
        );
        

        Controller.changeMainPage(View.mainPage(userAccount))
        

        Controller.initializeTimeCount(userAccount);
    
        
        
    }

    static initializeTimeCount(userAccount){
        Controller.interval = setInterval(function(){
            
            userAccount.daysPass();
            //Controller.calculateProfitPerSec(userAccount);
            Controller.updateUserInfoView(userAccount);
            Controller.updateLeftMainView(userAccount, Controller.calculateProfitPerSec(userAccount));  
        },1000)
    }


    static calculateProfitPerSec(userAccount){
        let totalProfit = 0;
        Controller.itemList.forEach(item => {
            if(item.type == "Real estate" && item.quantity > 0){
                totalProfit += item.profit * item.quantity;
            }else if(item.name == "ETF Bonds"){
                totalProfit += item.profit * item.quantity * item.price;
            }else if(item.name == "ETF Stock"){
                totalProfit += Controller.ETFStockTotal * item.profit;
            }
        });
        totalProfit = Math.ceil(totalProfit * 100)/100
        userAccount.getMoneyPerSec(totalProfit);
        console.log(totalProfit);
        return totalProfit
        
    }

    static buyItem(userAccount, itemObject, qty){
        userAccount.payMoney(itemObject.price * qty);
        itemObject.getItem(qty);
        if(itemObject.name == "ETF Stock"){
            Controller.ETFStockTotal += itemObject.price * itemObject.profit * qty;
            itemObject.increaseStockPrice(); 
        }
        Controller.updateLeftMainView(userAccount, Controller.calculateProfitPerSec(userAccount));
        Controller.updateItemSelectionView(userAccount);

    }
    static changeMainPage(container){
        Controller.config.page.innerHTML = "";
        Controller.config.page.append(container);
    }
    
    static updateUserInfoView(userAccount){
        Controller.config.userInfo.innerHTML = "";
        Controller.config.userInfo.append(View.userInfomation(userAccount));
    }

    static updateLeftMainView(userAccount, moneyPerSec){
        Controller.config.leftMain.innerHTML = "";
        Controller.config.leftMain.append(View.leftMainPage(userAccount, moneyPerSec));
    }

    static updateItemSelectionView(userAccount){
        Controller.config.itemSelection.innerHTML = "";
        Controller.config.itemSelection.append(View.itemSelector(userAccount));
    }

    static resetGameData(userAccount){
        clearInterval(Controller.interval);
        Controller.itemList.map(item=>{
            if(item.quantity > 0) item.quantity = 0;
        });
        Controller.ETFStockTotal = 0;
        Controller.initializeUserAccount(userAccount.name)
        
    }

    static saveGameData(userAccount){
        localStorage.removeItem(`${userAccount.name}`);
        let saveObject = userAccount;
        saveObject["ETFStockTotal"] = Controller.ETFStockTotal;

        let jsonEncoded = JSON.stringify(saveObject);
        localStorage.setItem(`${userAccount.name}`, jsonEncoded);
        clearInterval(Controller.interval);
        Controller.changeMainPage(View.makeNameForm());
        
    }

    static loadGameData(name){
        
        //console.log(localStorage.getItem(inputName))
        if(! localStorage.getItem(name)) alert("There is no data");
        else{
            let myLocalStrage = localStorage.getItem(name);
            let jsonDecoded = JSON.parse(myLocalStrage);
            Controller.ETFStockTotal = jsonDecoded.ETFStockTotal;
            
            //Controller.itemList = jsonDecoded.purchasedItem;

            let savedUserAccount = new User(
                jsonDecoded.name,
                jsonDecoded.age,
                jsonDecoded.day,
                jsonDecoded.money,
                jsonDecoded.burger,
                jsonDecoded.purchasedItem
            );
            //console.log(savedUserAccount);
            Controller.changeMainPage(View.mainPage(savedUserAccount))
  
            Controller.initializeTimeCount(savedUserAccount);
            
        } 
        
    }
    


    
    
    
    

    

    


    
    
    

}

Controller.initializeApp();


/*

page1
    <div class="vh-100 bg-dark d-flex flex-column justify-content-center align-items-center p-5 ">
       <div class="d-flex justify-content-center  col-12  background py-3">
           <div class="d-flex row  px-2 ">
                <div class="col-sm-5 bg-dark  py-3 ">
                    <div class=" background text-center text-white py-4 mb-5">
                        <h2 class="mb-2">1,102 Burgars</h2>
                        <h2 class="mb-2">$0/click</h2>
                        <h2 class="">$25/days</h2>
                        
                    </div>

                    <img class="img-fluid pt-5" src="https://cdn.pixabay.com/photo/2014/12/21/23/36/burgers-575655_1280.png">





                </div>
                <div class="col-sm-7 d-flex  flex-column   ">
                    <div class="d-flex flex-column align-items-center   bg-dark py-2  mb-5 text-center text-white">
                        <div class="d-flex col px-2">
                     
                            <div class="col background mr-1 mb-1">
                                <h3>Steven</h3>
                            </div>
                            <div class="col  background mb-1">
                                <h3>25 yrs old</h3>
                            </div>
                        </div>
                   
                        <div class="d-flex col px-2">
                     
                            <div class="col background mr-1">
                                <h3>1,882 days</h3>
                            </div>
                            <div class="col background ">
                                <h3>$1,234,111,902</h3>
                            </div>
                        </div>
                        
                    </div>

                    <div class="col bg-dark p-3  overflow-auto vh-100  ">
                        <div class="background d-flex align-items-center p-2 text-white text-center mb-2 ">
                            <img class="col-5 img-fluid" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                            <div class="col-5 flex-column ">
                                <div>
                                    <h3>House</h4>
                                    <h5>$20,000,000</h5>
                                    <h5>+32,000/sec</h5>
                                </div>
                            </div>
                            <h3 class="col-2 ">2</h3>
                        </div>
                        <div class="background d-flex align-items-center p-2 text-white text-center mb-2 ">
                            <img class="col-5 img-fluid" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                            <div class="col-5 flex-column">
                                <div>
                                    <h4>House</h4>
                                    <p>$20,000,000</p>
                                    <p>+32,000/sec</p>
                                </div>
                            </div>
                            <h3 class="col-2 ">2</h3>
                        </div>
                        <div class="background d-flex align-items-center p-2 text-white text-center mb-2 ">
                            <img class="col-5 img-fluid" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                            <div class="col-5 flex-column">
                                <div>
                                    <h4>House</h4>
                                    <p>$20,000,000</p>
                                    <p>+32,000/sec</p>
                                </div>
                            </div>
                            <h3 class="col-2 ">2</h3>
                        </div>
                        <div class="background d-flex align-items-center p-2 text-white text-center mb-2">
                            <img class="col-5 img-fluid" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                            <div class="col-5 flex-column">
                                <div>
                                    <h4>House</h4>
                                    <p>$20,000,000</p>
                                    <p>+32,000/sec</p>
                                </div>
                            </div>
                            <h3 class="col-2 ">2</h3>
                        </div>
                        
                    </div>



                    <div class="d-flex justify-content-end mt-2 ">
                        <div class="btn-border p-1 mr-3">
                            <i class="fas fa-undo fa-4x"></i>
                        </div>

                        <div class="btn-border p-1 ">
                            <i class="far fa-save fa-4x"></i>
                        </div>

                    </div>

                </div>

           </div>
        </div>
        
    </div>












    page2
    <div class="vh-100 bg-dark d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex align-items-center col-md-7 col-10">
            <div id="initial-form" class="col-12 text-white text-center p-5">
                <h1>Clicker Empire Game</h1>
                <img width="300px" alt="Empire" src="https://image.flaticon.com/icons/png/512/1752/1752130.png">
                <div class="form-group pt-3">
                    <input type="text" class="form-control" placeholder="Type your name">
                </div>
                <div class="d-flex justify-content-between">
                    <div class="col-6 pl-0">
                        <button class="btn btn-outline-primary col-12 back-btn">New Game</button>
                    </div>
                    <div class="col-6 pr-0">
                        <button class="btn btn-primary col-12 next-btn">Load Game</button>
                    </div>
                </div>


            </div>
        </div>
        
    </div>

*/