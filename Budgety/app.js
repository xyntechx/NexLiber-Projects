/** @format */

//BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcpercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      //ID = Last Id + 1
      //create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create new item based on whether "inc" or "exp"
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      //push into our data structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    },

    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type]?.map(function (current) {
        return current.id;

        index = ids.indexOf(id);

        if (index !== -1) {
          data.allItems[type].splice(index, 1);
        }
      });
    },

    calculateBudget: function () {
      //calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      //calculate the budget: income- expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate percentage of spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();

//UI CONTROLLER
var UIController = (function () {
  var Domstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: " .add__value",
    inputBtn: ".add_btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income---value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };
  var NodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(Domstrings.inputType).value, //either inc or exp
        description: document.querySelector(Domstrings.inputDescription).value,
        value: parseFloat(document.querySelector(Domstrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, newHmtl, element;
      //Create html string with placeholder text

      if (type === "inc") {
        element = Domstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-thin fa-circle-xmark"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = Domstrings.expensesContainer;
        html =
          ' <div class="item clearfix" id="expenses-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fa fa-thin fa-circle-xmark"></i></button></div></div></div>';
      }

      //Replace the placeholder text wwith some actual data

      newHmtl = html.replace("%id%", obj.id);
      newHmtl = newHmtl.replace("%description%", obj.description);
      newHmtl = newHmtl.replace("%value%", obj.value);
      //insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHmtl);
    },
    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        Domstrings.inputDescription + "," + Domstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(Domstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(Domstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(Domstrings.expenseLabel).textContent =
        obj.totalExp;
      document.querySelector(Domstrings.percentageLabel).textContent =
        obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(Domstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(Domstrings.percentageLabel).textContent = "---";
      }
    },

    displayMonth: function(){
      var year, now;
now = new Date();
month = now.getMonth();


months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
year = now.getFullYear();
document.querySelector(Domstrings.dateLabel).textContent = months[month] + ' ' + year;

    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(Domstrings.expensesPercLabel);


      NodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    changedType: function(){
      var fields = document.querySelectorAll(Domstrings.inputType + ',' +  Domstrings.inputDescription + ',' + Domstrings.inputValue);
      NodeListForEach(fields, function(cur){
        cur.classList.toggle(right);
      })

    },
    getDomstrings: function () {
      return Domstrings;
    },
  };
})();

//GLOBAL APP CONTROLLER

var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDomstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document
      .querySelector(DOM.inputBtn)
      .addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
      document.querySelector(DOM.inputType).addEventListener('change', UICtrl.inputType);
  };

  var updateBudget = function () {
    //1. calculate the budget
    budgetCtrl.calculateBudget();
    //2. return the budget
    var budget = budgetCtrl.getBudget();
    //3. display the budget on UI
    UICtrl.displayBudget(budget);

    var updatePercentages = function () {
      // 1. calculate percentages
      budgetCtrl.calculatePercentages();
      // 2. read percentages from the budget controller
      var percentages = budgetCtrl.getPercentages();
      // 3. update the UI with the new percentages
      UICtrl.displayPercentages(percentages);
    };
  };
  var ctrlAddItem = function () {
    var input, newItem;
    //  1. get the filed input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. addd the new item to the UI
      UICtrl.addListItem(newItem, input.type);
      //4. clear the fields
      UICtrl.clearFields();
      //5. calculate and update budget
      updateBudget();


    }
  };
  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      //inc-1
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. delete item from the user interface
      UICtrl.deleteListItem(itemID);
      // 3. update and show the new budget


    }

  };

  return {
    init: function () {
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);
controller.init();
