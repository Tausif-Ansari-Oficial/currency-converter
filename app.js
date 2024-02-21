const theUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector('button')
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
let msg = document.querySelector('.msg')


for (let slt of dropdowns) {
    for (key in countryList) {
        let newSelect = document.createElement("option")
        newSelect.textContent = key
        newSelect.value = key;
        if (slt.name == "from" && key == "USD") {
            newSelect.selected = 'selected'
        } else if (slt.name == "to" && key == "INR") {
            newSelect.selected = 'selected'
        }
        slt.append(newSelect)
    }
    slt.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (elt) => {
    let currCode = elt.value
    let countryCode = countryList[currCode]
    // console.log(currCode,':',countryCode);
    let countrySrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = elt.parentElement.querySelector('img')
    img.src = countrySrc
}

const exchange = async () => {
    let inp = document.querySelector('.amount input')
    let inpVal = inp.value;
    if (inpVal == '' || inpVal < 1) {
        inpVal = 0
    }
    let URL = `${theUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
        let promice = await fetch(URL);
        let data = await promice.json()
        let rate = data[toCurr.value.toLowerCase()]
        let finalTotal = rate * inpVal
        msg.textContent = finalTotal
    } catch {
        console.log("errr");
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    exchange()
});

window.addEventListener('load', () => {
    exchange()
})