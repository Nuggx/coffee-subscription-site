// ######### NAVIGATION CODE ###########
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', () => {
        //togle nav
        nav.classList.toggle('nav-active');
        //animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + .5}s`;
            }
        });
        //burger animation
        burger.classList.toggle('toggle');
    });
    for ( let i=0;i<navLinks.length; i++){
        let self = navLinks[i];
        self.addEventListener('click', () => {
            //close menu when a link is clicked
            nav.classList.toggle('nav-active');
            //make sure animations still work
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + .5}s`;
                }
            });
            //reset burger to default
            burger.classList.toggle('toggle');
        })
    }
}


// ############ CUSTOMIZE PLAN #############

//collapsable headers
let collapsible = document.getElementsByClassName("question-header");
const toggleClass = (el, className) => el.classList.toggle(className);

for(let i = 0; i<collapsible.length; i++) {
    if (!collapsible[i].classList.contains('disabled')) {
        collapsible[i].addEventListener("click", function() {
            this.childNodes.forEach(child => {
                    if (child.className === 'arrow up' || child.className === 'arrow down') {
                        toggleClass(child, "up")
                        toggleClass(child, "down")
                    }
                }
            )
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.classList.toggle("expanded")
        });
    }
}

const cardscontainers = document.querySelectorAll(".plan-card-container");
const cardscontainer = document.querySelectorAll(".question-container")
const orderSummary = document.getElementById('order-summary-text')
const unavailable = document.getElementById('unavailable-text')

const setCurrent = (e, cards) => {
    let current = cards.filter(card => card.classList.contains('selected'));
    if (current.length === 1) {
        toggleClass(current[0],"selected")
    }
    toggleClass(e, "selected")

    
}
const openNext = (container) => {
    let firstcontainer = container.parentElement;
    let secondcontainer = firstcontainer.nextElementSibling
        if (firstcontainer.id != 'question-5') {
            if((firstcontainer.id === 'question-3') && (collapsible[3].classList.contains('disabled')  )){
                console.log(collapsible[3].classList.contains('disabled'))
                secondcontainer.nextElementSibling.firstElementChild.click();
            } else if(!secondcontainer.firstElementChild.classList.contains("active")){
                secondcontainer.firstElementChild.click();
            }
        }
}
generateOrderSummary = () => {
    let choices = [];
    for(i=0; i<5;i++) {
        let selectedText = "___";
        let cards = Array.from(cardscontainer[i].children[1].children)
        selected = cards.filter(card => card.classList.contains('selected'))
        if (selected.length != 0) {
            selectedText = selected[0].children[0].innerText;
        }
        choices[i] = selectedText;
    }
    if (choices[0] != "Capsule" && collapsible[3].classList.contains('disabled')){
        collapsible[3].classList.remove('disabled');
        unavailable.style.display = "none";
        collapsible[3].click();
    }
    let OrderSummaryText = ""
    if (choices[0] === "Capsule"){
        if (collapsible[3].classList.contains('active')) {
            collapsible[3].click();
        }
        collapsible[3].classList.add('disabled');
        unavailable.style.display = "block";
        OrderSummaryText = '\"I drink my coffee as <span style="color:#0E8784">' + choices[0] + '</span>, with a <span style="color:#0E8784">' + choices[1] + '</span> type of bean. <span style="color:#0E8784">' + choices[2] + '</span>, sent to me <span style="color:#0E8784">' + choices[4] + '</span>.\"';
    } else {
        OrderSummaryText = '\"I drink my coffee as <span style="color:#0E8784">' + choices[0] + '</span>, with a <span style="color:#0E8784">' + choices[1] + '</span> type of bean. <span style="color:#0E8784">' + choices[2] + '</span> ground ala <span style="color:#0E8784">' + choices[3] + '</span>, sent to me <span style="color:#0E8784">' + choices[4] + '</span>.\"';
    }
        console.log(OrderSummaryText)
    orderSummary.innerHTML = OrderSummaryText;
}
cardscontainers.forEach(cardscontainer => {
    let cards = Array.from(cardscontainer.children)
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            //set card to current selection for that row
            setCurrent(e.currentTarget, cards)
            openNext(cardscontainer)
            generateOrderSummary();
            //close current row and open next
        })
    })
})





// Function calls
navSlide();
// 