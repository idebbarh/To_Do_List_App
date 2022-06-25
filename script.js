let headerInputTitle = document.getElementById("header-title");
headerInputTitle.addEventListener("focusin",()=>{
    headerInputTitle.style.background = "white"
    headerInputTitle.style.color = "black"
    headerInputTitle.style.width = "fit-content"
})
headerInputTitle.addEventListener("focusout",()=>{
    let parag = document.createElement("p")
    parag.appendChild(document.createTextNode(headerInputTitle.value))
    parag.style.fontSize = "30px"
    parag.style.fontWeight = "bold";
    window.localStorage["headerInputTitleWidth"] = 20*(headerInputTitle.value.length+1)+"px"
    headerInputTitle.style.width = window.localStorage["headerInputTitleWidth"];
    headerInputTitle.style.background = "none";
    headerInputTitle.style.color = "white";
    window.localStorage["headerInputTitleUserInput"] = headerInputTitle.value;
})
let addNewTaskBtn = document.getElementById("add-new-task-btn");
let todosInput = document.getElementById("todos-input");
let undoneTasks = document.getElementById("undone-tasks");
let allTasksList = [];
let allStarsStatus = [];
let taskStatus = [];
let taskColorValue = [];
let taskDate = [];
function addNewTask(taskTitle){
    if(todosInput.value.length > 0 || taskTitle.length > 0){
        //creat task element
        let elemLi = document.createElement("li")
        //add task class
        elemLi.className = "task";
        elemLi.draggable = true;
        //creat left div
        let divLeft = document.createElement("div")
        divLeft.className = "left";
        //creat right div
        let divRight = document.createElement("div")
        divRight.className = "right";
        //creat div left elem
        //creat ckeckbox 
        let ckboxElem = document.createElement("input")
        ckboxElem.type = "checkbox";
        ckboxElem.className = "checkbox";
        //creat task title
        let taskTitleElem = document.createElement("span");
        taskTitleElem.className = "task-title";
        //creat task title text value 
        let todosInputValue = ""
        taskTitle === "" ? todosInputValue = todosInput.value : todosInputValue = taskTitle;
        let taskTitleTextValue = document.createTextNode(todosInputValue)
        // add task title text value to task title
        taskTitleElem.appendChild(taskTitleTextValue)
        //creat date input 
        let dateTask = document.createElement("input");
        dateTask.type = "date";
        dateTask.className = "task-date";
        // creat before set date span 
        let befSetDateSpan = document.createElement("span");
        befSetDateSpan.className = "before-set-date";
        // creat date span text value
        let befSetDateSpanTextValue = document.createTextNode("No due date");
        // add date span text value to before set date span 
        befSetDateSpan.appendChild(befSetDateSpanTextValue)
        //add all left div elements to left div 
        divLeft.appendChild(ckboxElem)
        divLeft.appendChild(taskTitleElem)
        divLeft.appendChild(dateTask)
        divLeft.appendChild(befSetDateSpan)
       //creat div right elem
        //creat star task icon 
        let starTaskIconElem = document.createElement("i");
        starTaskIconElem.className = "fa-solid fa-star star-task";
        let starActive = false;
        //creat task color changer holder
        let taskColorChangerHolderElm = document.createElement("div");
        taskColorChangerHolderElm.className = "task-color-changer-holder";
        //creat task color changer holder elements 
        //creat task color changer icon 
        let taskColorChangerIconElem = document.createElement("i");
        taskColorChangerIconElem.className = "fa-solid fa-tag task-color-changer";
        //creat colors menu
        let colorsMenuElem = document.createElement("ul");
        colorsMenuElem.className = "colors-menu";
        // creat colors menu elem 
        let colorNormal = document.createElement("li")
        colorNormal.className = "normal";
        let colorRed = document.createElement("li")
        colorRed.className = "red";
        let colorBlue = document.createElement("li")
        colorBlue.className = "blue"
        let colorGreen = document.createElement("li")
        colorGreen.className = "green";
        let colorPurple = document.createElement("li")
        colorPurple.className = "purple"
        let colorOrange = document.createElement("li")
        colorOrange.className = "orange"
        let colorsMenuStatus = false;
        //add elem to colors menu
        colorsMenuElem.appendChild(colorNormal)
        colorsMenuElem.appendChild(colorRed)
        colorsMenuElem.appendChild(colorBlue)
        colorsMenuElem.appendChild(colorGreen)
        colorsMenuElem.appendChild(colorPurple)
        colorsMenuElem.appendChild(colorOrange)
        //add elem to task color changer elmen
        taskColorChangerHolderElm.appendChild(taskColorChangerIconElem)
        taskColorChangerHolderElm.appendChild(colorsMenuElem)
        //creat delete task elem 
        let deleteTaskIconElem = document.createElement("i");
        deleteTaskIconElem.className = "fa-solid fa-xmark delete-task";
        // add elem to right div 
        divRight.appendChild(starTaskIconElem)
        divRight.appendChild(taskColorChangerHolderElm)
        divRight.appendChild(deleteTaskIconElem)
        //add left and right div to task elem 
        elemLi.appendChild(divLeft)
        elemLi.appendChild(divRight)
        // add task elem to undone tasks 
        undoneTasks.appendChild(elemLi);
        let allelemLi = document.querySelectorAll(".task");
            if(taskTitle === ""){
                allTasksList.push(todosInput.value);
                allStarsStatus.push(false);
                taskStatus.push("undone");
                taskColorValue.push("normal");
                taskDate.push("No due date")
                window.localStorage.setItem("allTasksList",JSON.stringify(allTasksList));
                window.localStorage.setItem("allStarsStatus",JSON.stringify(allStarsStatus));
                window.localStorage.setItem("taskStatus",JSON.stringify(taskStatus));
                window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValue));
                window.localStorage.setItem("taskDate",JSON.stringify(taskDate));
                undoneTasks.prepend(elemLi);
            }
            else{
                allTasksList.push(taskTitle);
                allStarsStatus =  JSON.parse(localStorage.getItem("allStarsStatus"));
                taskStatus = JSON.parse(localStorage.getItem("taskStatus"));
                taskColorValue = JSON.parse(localStorage.getItem("taskColorValue"));
                taskDate = JSON.parse(localStorage.getItem("taskDate"));
                let allStarstIcon = document.querySelectorAll(".star-task");
                let allCheckBox = document.querySelectorAll(".checkbox");
                for(let i = 0 ; i < allelemLi.length ; i++){
                    if(elemLi === allelemLi[i]){
                        if(allStarsStatus[i] === true){
                            allStarstIcon[i].className = "fa-solid fa-star star-task star-active";
                            starActive = true;
                            elemLi.style.background = "#daeefa";
                        }
                        if(taskStatus[i]==="done"){
                            allCheckBox[i].checked = true;
                            elemLi.style.background = "#ccc";
                            elemLi.style.opacity = "0.5";
                            taskTitleElem.style.textDecoration = "line-through";
                            ckboxElem.style.accentColor = "#ebeef4";
                            starTaskIconElem.style.display = "none";
                            taskColorChangerIconElem.style.display = "none";
                            ckboxElem.style.background = "white";
                        }
                        if(taskStatus[i]!=="done"){
                            undoneTasks.prepend(elemLi)
                        }

                        if(taskColorValue[i] === "normal"){
                            colorNormal.style.borderRadius = "0";
                            colorBlue.style.borderRadius = "50%";
                            colorGreen.style.borderRadius = "50%";
                            colorPurple.style.borderRadius = "50%";
                            colorRed.style.borderRadius = "50%";
                            colorOrange.style.borderRadius = "50%";
                            ckboxElem.style.background = "white";
                        }
                        if(taskColorValue[i] === "red"){
                            colorNormal.style.borderRadius = "50%";
                            colorBlue.style.borderRadius = "50%";
                            colorGreen.style.borderRadius = "50%";
                            colorPurple.style.borderRadius = "50%";
                            colorRed.style.borderRadius = "0";
                            colorOrange.style.borderRadius = "50%";
                            ckboxElem.style.background = "#dc4c3e";
                        }
                        if(taskColorValue[i] === "blue"){
                            colorNormal.style.borderRadius = "50%";
                            colorBlue.style.borderRadius = "0";
                            colorGreen.style.borderRadius = "50%";
                            colorPurple.style.borderRadius = "50%";
                            colorRed.style.borderRadius = "50%";
                            colorOrange.style.borderRadius = "50%";
                            ckboxElem.style.background = "#29a9eb";
                        }
                        if(taskColorValue[i] === "green"){
                            colorNormal.style.borderRadius = "50%";
                            colorBlue.style.borderRadius = "50%";
                            colorGreen.style.borderRadius = "0";
                            colorPurple.style.borderRadius = "50%";
                            colorRed.style.borderRadius = "50%";
                            colorOrange.style.borderRadius = "50%";
                            ckboxElem.style.background = "var(--main-checked-color)";
                        }
                        if(taskColorValue[i] === "purple"){
                            colorNormal.style.borderRadius = "50%";
                            colorBlue.style.borderRadius = "50%";
                            colorGreen.style.borderRadius = "50%";
                            colorPurple.style.borderRadius = "0";
                            colorRed.style.borderRadius = "50%";
                            colorOrange.style.borderRadius = "50%";
                            ckboxElem.style.background = "#843ab8";
                        }
                        if(taskColorValue[i] === "orange"){
                            colorNormal.style.borderRadius = "50%";
                            colorBlue.style.borderRadius = "50%";
                            colorGreen.style.borderRadius = "50%";
                            colorPurple.style.borderRadius = "50%";
                            colorRed.style.borderRadius = "50%";
                            colorOrange.style.borderRadius = "0";
                            ckboxElem.style.background = "#ff9600";
                        }
                        befSetDateSpan.textContent = taskDate[i];
                    }
                }
            }
        todosInput.value = ""
        //Events 
        let dateOpen = false;
        dateTask.addEventListener("change",()=>{
            if(dateTask.value === "")
                befSetDateSpan.textContent = "No due date";
            else{
                befSetDateSpan.textContent = dateTask.value
            }
            dateTask.style.display = "none";
            dateOpen = false; 
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskDateChange = JSON.parse(localStorage.getItem("taskDate"));
                    taskDate[i] = befSetDateSpan.textContent;
                    taskDateChange[i] = befSetDateSpan.textContent;
                    window.localStorage.setItem("taskDate",JSON.stringify(taskDateChange));  
                }
            }
        })
        befSetDateSpan.addEventListener("click",()=>{
            if(!dateOpen){
                dateTask.style.display = "block";
                dateOpen = true;
            }
            else{
                dateTask.style.display = "none";
                dateOpen = false; 
            }
            
        })
        starTaskIconElem.addEventListener("click",()=>{
            if(!starActive){
                starActive = true;
                starTaskIconElem.className = "fa-solid fa-star star-task star-active";
                elemLi.style.background = "#daeefa";
                for(let i = 0 ; i < allelemLi.length ; i++){
                    if(elemLi === allelemLi[i]){
                        let StarsChangedStatus = JSON.parse(localStorage.getItem("allStarsStatus"));
                        StarsChangedStatus[i] = true;
                        allStarsStatus[i] = true;
                        window.localStorage.setItem("allStarsStatus",JSON.stringify(StarsChangedStatus));
                    }
                }
            }
            else{
                starActive = false;
                starTaskIconElem.className = "fa-solid fa-star star-task";
                elemLi.style.background = "white";
                for(let i = 0 ; i < allelemLi.length ; i++){
                    if(elemLi === allelemLi[i]){
                        let StarsChangedStatus = JSON.parse(localStorage.getItem("allStarsStatus"));
                        StarsChangedStatus[i] = false;
                        allStarsStatus[i] = false;
                        window.localStorage.setItem("allStarsStatus",JSON.stringify(StarsChangedStatus));
                    }
                }
            }
        })
        colorNormal.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "0";
            colorBlue.style.borderRadius = "50%";
            colorGreen.style.borderRadius = "50%";
            colorPurple.style.borderRadius = "50%";
            colorOrange.style.borderRadius = "50%";
            ckboxElem.style.background = "white";
            colorRed.style.borderRadius = "50%";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "normal";
                    taskColorValueChange[i] = "normal";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        colorRed.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "50%";
            colorBlue.style.borderRadius = "50%";
            colorGreen.style.borderRadius = "50%";
            colorPurple.style.borderRadius = "50%";
            colorOrange.style.borderRadius = "50%";
            ckboxElem.style.background = "#dc4c3e";
            colorRed.style.borderRadius = "0";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "red";
                    taskColorValueChange[i] = "red";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        colorBlue.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "50%";
            colorBlue.style.borderRadius = "0";
            colorGreen.style.borderRadius = "50%";
            colorPurple.style.borderRadius = "50%";
            colorOrange.style.borderRadius = "50%";
            ckboxElem.style.background = "#29a9eb";
            colorRed.style.borderRadius = "50%";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "blue";
                    taskColorValueChange[i] = "blue";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        colorGreen.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "50%";
            colorBlue.style.borderRadius = "50%";
            colorGreen.style.borderRadius = "0";
            colorPurple.style.borderRadius = "50%";
            colorOrange.style.borderRadius = "50%";
            ckboxElem.style.background = "var(--main-checked-color)";
            colorRed.style.borderRadius = "50%";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "green";
                    taskColorValueChange[i] = "green";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        colorPurple.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "50%";
            colorBlue.style.borderRadius = "50%";
            colorGreen.style.borderRadius = "50%";
            colorPurple.style.borderRadius = "0";
            colorOrange.style.borderRadius = "50%";
            ckboxElem.style.background = "#843ab8";
            colorRed.style.borderRadius = "50%";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "purple";
                    taskColorValueChange[i] = "purple";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        colorOrange.addEventListener("click",()=>{
            colorNormal.style.borderRadius = "50%";
            colorBlue.style.borderRadius = "50%";
            colorGreen.style.borderRadius = "50%";
            colorPurple.style.borderRadius = "50%";
            colorOrange.style.borderRadius = "0";
            ckboxElem.style.background = "#ff9600";
            colorRed.style.borderRadius = "50%";
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi === allelemLi[i]){
                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "orange";
                    taskColorValueChange[i] = "orange";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));  
                }
            }
        })
        taskColorChangerIconElem.addEventListener("click",()=>{
            if(!colorsMenuStatus){
                colorsMenuElem.style.display = "flex";
                colorsMenuStatus = true
            }
            else{
                colorsMenuElem.style.display = "none";
                colorsMenuStatus = false
            }
        })
        deleteTaskIconElem.addEventListener("click",()=>{
            for(let i = 0 ; i < allelemLi.length ; i++){
                if(elemLi == allelemLi[i]){
                    let oldTaskItems = JSON.parse(localStorage.getItem("allTasksList"));
                    oldTaskItems[i] = false;
                    allTasksList[i] = false;
                    window.localStorage.setItem("allTasksList",JSON.stringify(oldTaskItems));

                    let oldallStarsStatus = JSON.parse(localStorage.getItem("allStarsStatus"));
                    oldallStarsStatus[i] = "del";
                    allStarsStatus[i] = "del";
                    window.localStorage.setItem("allStarsStatus",JSON.stringify(oldallStarsStatus));

                    let taskChangedStatus = JSON.parse(localStorage.getItem("taskStatus"));
                    taskStatus[i] = "del";
                    taskChangedStatus[i] = "del";
                    window.localStorage.setItem("taskStatus",JSON.stringify(taskChangedStatus));

                    let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                    taskColorValue[i] = "del";
                    taskColorValueChange[i] = "del";
                    window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));

                    let taskDateChange = JSON.parse(localStorage.getItem("taskDate"));
                    taskDate[i] = "del";
                    taskDateChange[i] = "del";
                    window.localStorage.setItem("taskDate",JSON.stringify(taskDateChange));  

                }
            }
            elemLi.remove()
        })
        ckboxElem.addEventListener("change",()=>{
            if(ckboxElem.checked){
                elemLi.style.background = "#ccc";
                elemLi.style.opacity = "0.5";
                taskTitleElem.style.textDecoration = "line-through";
                ckboxElem.style.accentColor = "#ebeef4";
                undoneTasks.appendChild(elemLi);
                starActive = false;
                starTaskIconElem.className = "fa-solid fa-star star-task" ;
                starTaskIconElem.style.display = "none";
                taskColorChangerIconElem.style.display = "none";
                colorNormal.style.borderRadius = "0";
                colorBlue.style.borderRadius = "50%";
                colorGreen.style.borderRadius = "50%";
                colorPurple.style.borderRadius = "50%";
                colorOrange.style.borderRadius = "50%";
                ckboxElem.style.background = "white";
                colorRed.style.borderRadius = "50%";
                colorsMenuStatus = false;
                colorsMenuElem.style.display = "none";
                dateTask.style.display = "none";
                dateOpen = false; 

                for(let i = 0 ; i < allelemLi.length ; i++){
                    if(elemLi === allelemLi[i]){
                        let StarsChangedStatus = JSON.parse(localStorage.getItem("allStarsStatus"));
                        StarsChangedStatus[i] = false;
                        allStarsStatus[i] = false;
                        window.localStorage.setItem("allStarsStatus",JSON.stringify(StarsChangedStatus));
                        let taskChangedStatus = JSON.parse(localStorage.getItem("taskStatus"));
                        taskStatus[i] = "done";
                        taskChangedStatus[i] = "done";
                        window.localStorage.setItem("taskStatus",JSON.stringify(taskChangedStatus));

                        let taskColorValueChange = JSON.parse(localStorage.getItem("taskColorValue"));
                        taskColorValue[i] = "normal";
                        taskColorValueChange[i] = "normal";
                        window.localStorage.setItem("taskColorValue",JSON.stringify(taskColorValueChange));
                    }
                }
            }else{
                elemLi.style.background = "white";
                elemLi.style.opacity = "1";
                starTaskIconElem.style.display = "block";
                taskColorChangerIconElem.style.display = "block";
                taskTitleElem.style.textDecoration = "none";
                ckboxElem.style.accentColor = "var(--main-checked-color)";
                undoneTasks.prepend(elemLi);
                for(let i = 0 ; i < allelemLi.length ; i++){
                    if(elemLi === allelemLi[i]){
                        let taskChangedStatus = JSON.parse(localStorage.getItem("taskStatus"));
                        taskStatus[i] = "undone";
                        taskChangedStatus[i] = "undone";
                        window.localStorage.setItem("taskStatus",JSON.stringify(taskChangedStatus));
                    }
                }
            }
        })
}
}
addNewTaskBtn.addEventListener("click",()=>{
    addNewTask("")
})
todosInput.addEventListener("keypress",(t)=>{
    if(t.keyCode === 13){
        addNewTask("")
    }
})
//local storage
if(window.localStorage["allTasksList"] !== undefined){
    let storageTasks = JSON.parse(localStorage.getItem("allTasksList"));
    let StarsS = JSON.parse(localStorage.getItem("allStarsStatus"));
    let storageTaskStatus = JSON.parse(localStorage.getItem("taskStatus"));
    let storageTaskColorValue = JSON.parse(localStorage.getItem("taskColorValue"));
    let storageTaskDate = JSON.parse(localStorage.getItem("taskDate"));
    let filtredStorageTasks = [];
    let filtredStorageAllStarsStatus = [];
    let filtredStorageTaskStatus = [];
    let filtredStorageTaskColorValue = [];
    let filtredStorageTaskDate = []
    for(t in storageTasks){
        if(storageTasks[t] !== false){
            filtredStorageTasks.push(storageTasks[t])
        }
    }
    for(s in StarsS){
        if(StarsS[s] !== "del"){
            filtredStorageAllStarsStatus.push(StarsS[s])
        }
    }
    for(s in storageTaskStatus){
        if(storageTaskStatus[s] !== "del"){
            filtredStorageTaskStatus.push(storageTaskStatus[s])
        }
    }

    for(c in storageTaskColorValue){
        if(storageTaskColorValue[c] !== "del"){
            filtredStorageTaskColorValue.push(storageTaskColorValue[c])
        }
    }

    for(d in storageTaskDate){
        if(storageTaskDate[d] !== "del"){
            filtredStorageTaskDate.push(storageTaskDate[d])
        }
    }
    window.localStorage.setItem("allTasksList",JSON.stringify(filtredStorageTasks));
    window.localStorage.setItem("allStarsStatus",JSON.stringify(filtredStorageAllStarsStatus));
    window.localStorage.setItem("taskStatus",JSON.stringify(filtredStorageTaskStatus));
    window.localStorage.setItem("taskColorValue",JSON.stringify(filtredStorageTaskColorValue));
    window.localStorage.setItem("taskDate",JSON.stringify(filtredStorageTaskDate));
    for(let i = 0 ; i < storageTasks.length ; i++){
        if(storageTasks[i]===false){
            continue
        }
        addNewTask(storageTasks[i]);
    }
}
if(window.localStorage["headerInputTitleUserInput"] === undefined){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    headerInputTitle.value = `My to-do list ${today}`
}else{
    headerInputTitle.value = window.localStorage["headerInputTitleUserInput"];
    headerInputTitle.style.width = window.localStorage["headerInputTitleWidth"];
}
