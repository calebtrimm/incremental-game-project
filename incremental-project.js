let body = document.querySelector('body');
const sounds = {
    buy: new Audio('sounds/buy.mp3'),
    click: new Audio('sounds/coin.mp3'),
}
let assets = [
    {
        name: 'Miner',
        owned: 0,
        cps: 1,
        cost: 50,
        img: 'imgs/miner.jpeg',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Computer',
        owned: 0,
        cps: 10,
        cost: 500,
        img: 'imgs/computer.png',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Data Center',
        owned: 0,
        cps: 100,
        cost: 2000,
        img: 'imgs/datacenter.png',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Super Computer',
        owned: 0,
        cps: 1000,
        cost: 50000,
        img: 'imgs/supercomputer.jpg',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Quantum Computer',
        owned: 0,
        cps: 10000,
        cost: 200000,
        img: 'imgs/quantumcomputer.jpg',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'AI',
        owned: 0,
        cps: 100000,
        cost: 500000,
        img: 'imgs/AI.png',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Matrioshka Brain',
        owned: 0,
        cps: 1000000,
        cost: 20000000,
        img: 'imgs/matrioshka.jpg',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
    {
        name: 'Simulation',
        owned: 0,
        cps: 0,
        cost: 1000000000,
        img: 'imgs/simulation.jpg',
        totalCPS: function() {
            let total = this.cps * this.owned;
            return total;
        }
    },
];

let state = {
    coins: 0,
    assets: assets,
    totalCoins: 0,
    totalClicks: 0,
}

function playSounds(sound){
    sounds[sound].currentTime = 0;
    sounds[sound].play();
}

state.achievements = [
    {
        message: 'Entrepreneur',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.className ='achievements';
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },
    {
        message: 'From rags to riches',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.className ='achievements';
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },
    {
        message: 'Click madness',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.className ='achievements';
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },    
    {
        message: 'Money rocket',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.className ='achievements';
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },    
    {
        message: 'Singularity',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.className ='achievements';
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },    
    {
        message: 'Ready for simulation',
        completed: false,
        isComplete: function () {
            let risingDiv = document.createElement('div');
            risingDiv.setAttribute('id', 'achievements');
            risingDiv.innerHTML = this.message;
            if (this.seen === true){
                document.getElementById('container').appendChild(risingDiv);
            }
        },
        seen: false,
    },
]

function checkAchievements(){
    if (state.assets[0].owned > 4){
        completeAchievement(0);
    }
    if (state.totalCoins >= 1000){
        completeAchievement(1)
    }
    if (state.totalClicks >= 100){
        completeAchievement(2)
    }
    if (cps >= 10000){
        completeAchievement(3)
    }
    if (state.assets[5].owned >= 1){
        completeAchievement(4)
    }
    if (state.coins >= state.assets[7].cost) {
        completeAchievement(5)
    }

}

function completeAchievement(index){
    if(state.achievements[index].completed !== true){
        state.achievements[index].seen = true;
        state.achievements[index].isComplete();
        state.achievements[index].completed = true;
    }
}


setInterval(() => {
    localStorage.setItem('state', JSON.stringify(state));
    // console.log(state);
}, 10000);

let getMoney;
let bonusCoinInt;
let cps = calcCPS();

function calcCPS(){
    let reducer = (acc, cur) => acc + cur.totalCPS();
    return state.assets.reduce(reducer, 0);
}

function getPos(ev, bonusCoins){
    let fallingText = document.createElement('div');
    fallingText.textContent = '+' + `${cps + bonusCoins + 1}`;
    fallingText.setAttribute('id', 'fallingText');
    fallingText.style.left= ev.clientX + 'px';
    fallingText.style.top = ev.clientY + 'px';
    document.getElementById('container').appendChild(fallingText);
    setTimeout(() => {
        document.getElementById('container').removeChild(fallingText);
    },500);
}

function coinClick(){
    playSounds('click');
    state.totalClicks += 1;
    state.totalCoins += 1;
    state.totalCoins += cps;
    state.coins += 1;
    state.coins += cps;
    document.getElementById('coin').addEventListener('click', getPos(event, 0))
}

function bonusCoinClick(){
    playSounds('click');
    let bonusVal = (getRandomNum(2, 10) * cps)
    state.totalClicks += 1;
    state.totalCoins += 1;
    state.totalCoins += bonusVal;
    state.coins += bonusVal;
    document.getElementById('coin').addEventListener('click', getPos(event, bonusVal))
}

function createResourceBtns(idx){
    let resourceDiv = document.createElement('div');
    resourceDiv.setAttribute('id', 'resourceBtn'+ `${idx}`);
    resourceDiv.className = 'resourceBox';

    let icon = document.createElement('img');
    icon.src = `${state.assets[idx].img}`;

    let info = document.createElement('div');
    info.setAttribute('id', 'info'+ `${idx}`);

    let name = document.createElement('p');
    name.innerHTML = `${state.assets[idx].name}`;

    let coinImg = document.createElement('img');
    coinImg.src = 'imgs/coin.png'
    coinImg.style.height = '20px';

    let cost = document.createElement('span');
    cost.innerHTML = `${state.assets[idx].cost}`;

    let owned = document.createElement('div');
    owned.setAttribute('class', 'owned');
    owned.innerHTML = `${state.assets[idx].owned}`;

    document.getElementById('right').appendChild(resourceDiv);
    document.getElementById('resourceBtn' + `${idx}`).appendChild(icon);
    document.getElementById('resourceBtn' + `${idx}`).appendChild(info);
    document.getElementById('resourceBtn' + `${idx}`).appendChild(owned);
    document.getElementById('info' + `${idx}`).appendChild(name);
    document.getElementById('info' + `${idx}`).appendChild(coinImg);
    document.getElementById('info' + `${idx}`).appendChild(cost);
    resourceDiv.addEventListener('click', buy);

    function addAsset(idx) {
        let divArray = ['miner','computer', 'dataCenter', 'super', 'quantum', 'ai', 'matrioshka', 'simulation'];
        let assetIcon = document.createElement('img');
        assetIcon.src = state.assets[idx].img;
        if (idx === 7) {
            localStorage.clear();
            location.reload();
        }
        if (state.assets[idx].owned < 20){
            document.getElementById(divArray[idx]).appendChild(assetIcon);
        }
        document.getElementById(divArray[idx]).style.opacity = '1';
        state.assets[idx].owned += 1;
        owned.innerHTML = state.assets[idx].owned;
        state.assets[idx] = state.assets[idx];
        cps = calcCPS();
    }

    function buy(){
        playSounds('buy');
        if (state.coins >= state.assets[idx].cost){
        state.coins -= state.assets[idx].cost;
        addAsset(idx);
        }
    }

}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

bonusCoinInt = setInterval(() => {
    setTimeout(() =>{
        let bonusCoin = document.createElement('div');
        bonusCoin.setAttribute('id', 'bonus');
        bonusCoin.style.top = Math.random() * (innerHeight - 100) + 'px';
        bonusCoin.style.left = Math.random() * (innerHeight - 100) + 'px';
        document.getElementById('container').appendChild(bonusCoin);
        let coinImg = document.createElement('img');
        coinImg.src = 'imgs/coin.png';
        document.getElementById('bonus').appendChild(coinImg);

        bonusCoin.addEventListener('click', () => {
            playSounds('click');
            document.getElementById('container').removeChild(bonusCoin);
            bonusCoinClick();
        });

        setTimeout(() => {
            if (document.contains(document.getElementById('bonus'))){
            document.getElementById('container').removeChild(bonusCoin);
            }
        },10000)

    }, getRandomNum(0, 60000))
},40000)



function checkWallet() {
    for (let i = 0; i < state.assets.length; i++){
        if (state.coins < state.assets[i].cost){
            unavailable(i);
        }
        if (state.coins >= state.assets[i].cost) {
            document.getElementById('resourceBtn' + `${i}`).style.display = 'flex';
            document.getElementById('resourceBtn' + `${i}`).style.pointerEvents = 'auto';
            document.getElementById('resourceBtn' + `${i}`).style.opacity = '1';
        }
        else if (state.coins >= (state.assets[i].cost / 2)){
            document.getElementById('resourceBtn' + `${i}`).style.display = 'flex';
        }

    }
}

function cutZeros(num){
    let shortened = 0;
    if (num >= 1e6 && num < 1e9){
        shortened = (num / 1e6);
        newNum = shortened.toFixed(2) + " Million";
        return newNum;
    }
    if (num >= 1e9){
        shortened = (num / 1e9);
        newNum = shortened.toFixed(2) + " Billion";
        return newNum;
    }
    else {
        return num.toFixed();
    }
}

getMoney = setInterval(() => {
    checkAchievements();
    cutZeros(state.totalCoins);
    changeBG();
    cps = calcCPS();
    state.coins += (cps / 100);
    state.totalCoins += (cps / 100);
    checkWallet();
    return document.getElementById('total').innerHTML = cutZeros(state.coins);
}, 10)

function changeBG() {
    cps = calcCPS();
    if (cps > 1000000){
        return document.getElementById('left').style.backgroundImage = "url('imgs/fallingcoins2.gif')";
    }
    else if (cps > 100000) {
        return document.getElementById('left').style.backgroundImage = "url('imgs/fallingcoins1.gif')";
    }
    else if (cps > 1000 ) {
        return document.getElementById('left').style.backgroundImage = "url('imgs/fallingcoins0.gif')";
    }
    else {
        return document.getElementById('left').style.backgroundImage = 'none';
    }
}

function unavailable(index) {
    document.getElementById('resourceBtn' + `${index}`).style.opacity = '.5';
    document.getElementById('resourceBtn' + `${index}`).style.pointerEvents = 'none';
}


//Load State 
state = JSON.parse(localStorage.getItem('state')) || state;
state.assets.forEach(element => {
       element.totalCPS = function(){
        let total = this.cps * this.owned;
        return total;
       }
});

createResourceBtns(0);
createResourceBtns(1);
createResourceBtns(2);
createResourceBtns(3);
createResourceBtns(4);
createResourceBtns(5);
createResourceBtns(6);
createResourceBtns(7);

state.achievements.forEach(element => {
    element.isComplete = function () {
        let risingDiv = document.createElement('div');
        risingDiv.className = 'achievements';
        risingDiv.innerHTML = this.message;
        risingDiv.addEventListener('click', () => {
            document.getElementById('container').removeChild(risingDiv);
            this.seen === false;
        });
        document.getElementById('container').appendChild(risingDiv);
        setTimeout(() => {
            if (this.seen === true){
            document.getElementById('container').removeChild(risingDiv);
            }
        },10000)
    }
});



state.assets.forEach(element => {
    let idx = 0;
    for (i = element.owned; i > 0; i--){
        idx = state.assets.findIndex(item => {
            return item === element;
        })
        if (idx !== 7){
            let divArray = ['miner','computer', 'dataCenter', 'super', 'quantum', 'ai', 'matrioshka', 'simulation'];
            let assetIcon = document.createElement('img');
            assetIcon.src = element.img;
            document.getElementById(divArray[idx]).appendChild(assetIcon);
            document.getElementById(divArray[idx]).style.opacity = '.7';
        }
    }
});