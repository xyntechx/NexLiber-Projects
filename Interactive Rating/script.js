let rateDOM = document.querySelector('.flexbox').children;
let submitDOM = document.querySelector('.submit');
let success = document.querySelector('#value');
let ratingState = document.querySelector('.rating');
let thankState = document.querySelector('.thank-you')
let rate = 0;
for (num of rateDOM) {
    num.addEventListener('click', function() {
        rate = this.innerHTML
        for (btn of rateDOM) {
            btn.classList.remove('active');
        }

        this.classList.add('active');
    });
}
submitDOM.addEventListener("click", () => displayRate(rate));


function displayRate(rate) {
    if (rate === 0) {
        alert("Please rate us");
    } else {
        success.innerHTML = rate;
        ratingState.style.display = "none";
        thankState.style.display = "flex";
    }
}