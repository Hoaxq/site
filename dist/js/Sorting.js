let options = {
    No: "Нет",
    Name: "Название",
    Begin: "Бренд",
    End: "Год создания",
    FirstSide: "Тираж"
};

let arrOptions = [];
for (let key in options) {
    let newOption = document.createElement('option');
    let optionText = document.createTextNode(options[key]);
    newOption.appendChild(optionText);
    newOption.setAttribute('value', key);
    arrOptions.push(newOption);
}

new_stats.change = function(k, p) {
        let allKey = this.getAllKey();
        for(let key in allKey) {
            let w = this[allKey[key]][k];
            this[allKey[key]][k] = this[allKey[key]][p];
            this[allKey[key]][p] = w;
        }
};

new_stats.isCompareOrder = function(n, arrCompare) {
        for(let k = 0; k < arrCompare.length; k += 2) {
            let sortOrder = (arrCompare[k+1] === true)? 'desc' : 'asc';
            if (doCompare(this[arrCompare[k]][n], this[arrCompare[k]][n + 1], sortOrder)) {
                return true;
            } else if (this[arrCompare[k]][n] === this[arrCompare[k]][n + 1]) {
                continue;
            } else {
                return false;
            }
        }
        return false;
};

new_stats.sorted = function(arr) {
        let n = this[arr[0]].length;
        for(let i = 0; i < n - 1; i += 1) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.isCompareOrder(j, arr)) {
                    this.change(j, j + 1);
                }
            }
        }
        return true;
};

function doCompare (elem1, elem2, sortOrder)
{
    switch (sortOrder)
    {
        case 'asc':
            return elem1 > elem2;
            break;
        case 'desc':
            return elem1 < elem2;
            break;
    }
}

let sortButton = document.getElementById('sortButton');
sortButton.onclick = function (){
    new_stats.setToDefault();
    let arr = [];
    for (let i = 1; i <= document.getElementsByTagName("select").length; i++) {
        if (document.getElementById(`Select${i}`) !== null
            && document.getElementById(`Select${i}`).value !== 'No'){
            arr.push(document.getElementById(`Select${i}`).value);
            arr.push(document.getElementById(`sortOrder${i}`).checked);
        }
    }
    new_stats.sorted(arr);
    let table = document.getElementById('Table');
    table.innerHTML = new_stats.print();
};


function getActualOptions() {
    for (let count = 1; count <= 3; count++) {
        addOptionsToSelect(count);
    }
    for (let count = 1; count <= 3; count++) {
        removeOptions(count);
    }
}

function addOptionsToSelect(count){
    for (let i = 0; i < arrOptions.length; i++) {
        let flag = true;
        for (let j = 0; j < document.getElementById(`Select${count}`).options.length; j++) {
            if (document.getElementById(`Select${count}`).options[j].value === arrOptions[i].value) {
                flag = false;
                break;
            }
        }
        if (flag)
            document.getElementById(`Select${count}`)
                    .insertBefore(
                        arrOptions[i].cloneNode(true),
                        document.getElementById(`Select${count}`).options[i]
                    );
    }
}

function removeOptions(count){
    let index = 0;
    while (index < document.getElementById(`Select${count}`).length) {
        for (let i = 1; i <= 3; i++) {
            if (i === count) continue;
            if (document.getElementById(`Select${count}`).options[index].value === document.getElementById(`Select${i}`).value
                && document.getElementById(`Select${i}`).value !== "No") {
                document.getElementById(`Select${count}`).options[index] = null;
                index = 0;
            }
        }
        index++;
    }
}