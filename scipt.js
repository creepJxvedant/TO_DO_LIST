let data = JSON.parse(localStorage.getItem('my-data')) || [];
if (data) {
    setTimeout(listAdd, 500);
}
let nxtindex = +(localStorage.getItem('my-index')) || 0;


function getData() {
    const title = document.getElementById('textbox').value.trim();
    const date = document.getElementById('calender-box').value.trim();
    document.getElementById('textbox').value = '';
    document.getElementById('calender-box').value = '';
    if (title && date) {
        if (data == null) {
            SetItem(nxtindex, false, title, date);
        } else {
            SetItem(data.length, false, title, date);
        }
        listAdd();
    } else {
        alert('Choose all options.');
    }
}

function SetItem(idx, ischecked, title, date) {
    const currentdata = { idx, ischecked, title, date };
    data.push(currentdata);
    storageUpdate(data);
}

function storageUpdate(currentdata) {
    localStorage.setItem('my-data', JSON.stringify(currentdata));
    listAdd();
}

function listAdd() {
    document.querySelector('.list-item').innerHTML = '';
    data.forEach((list, index) => {
        let html = `
            <ul type="none" ${list.ischecked ?`style="text-decoration: line-through;"`:''}>
                <li><input id="check-btn" ${list.ischecked ? "checked" : ''} index=${list.idx} type="checkbox" onclick="updateList(this)"></li>
                <li style="max-width:15vw" >${list.title}</li>
                <li>${list.date}</li>
                <li><button class="btn-class" index=${list.idx} style="background-color: rgb(209, 71, 21);" onclick="deleteList(this)">delete</button></li>
                </ul><hr style="margin-top:5px"> `;

        document.querySelector('.list-item').innerHTML += html;
    });
}

function deleteList(item) {
    const index = item.getAttribute('index');
    data.forEach((list, arrindex) => {
        if (index == list.idx) {
            data.splice(arrindex, 1);
        }
    });

    data.forEach((list, index) => {
        data[index].idx = index;
    });
    storageUpdate(data);
}

function updateList(item) {
    const index = item.getAttribute('index');
    data.forEach((list, arrindex) => {
        if (index == list.idx) {
            data[arrindex].ischecked = !data[arrindex].ischecked;
        }
    });
    storageUpdate(data);
    listAdd();
}
