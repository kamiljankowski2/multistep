
const formValues = {
    userName: "",
    userMail: "",
    userTel: "",
    selectedPlan: {
        plan: "",
        price: ""
    },
    selectedAddons: [],
}

getInputValue = (event, key) => {
    const selectedInput = event.target;
        switch (selectedInput.getAttribute('data-function')) {
            case 'single-value':
                formValues[key] = selectedInput.value        
            break;
            case 'single-value-price':
                formValues[key] = {
                    plan: selectedInput.value,
                    price: selectedInput.getAttribute('data-price')
                }        
            break;
            case 'multi-value':
                if(selectedInput.checked) formValues[key].push({name: selectedInput.value, price:selectedInput.getAttribute('data-price')})
                if(!selectedInput.checked) formValues[key] = formValues[key].filter(item => item.name !== selectedInput.value) 
                
                
            break;
        
            default:
                break;
        } 
}

const planInputs = document.querySelectorAll('input[name="plan"]');
const addonsInputs = [...document.querySelectorAll('input[name="addon"]')]
const userName = document.querySelector('input[type="text"]')
const userMail = document.querySelector('input[type="email"]')
const userTel = document.querySelector('input[type="tel"]')
const selectedPlan = document.querySelector('.selected-plan')
const selectedPlanPrice = document.querySelector('.selected-plan-price')
const selectedAddonsList = document.querySelector('.selected-addons-list')
const priceTotal = document.querySelector('.price-total')

planInputs.forEach(planInput => {
    planInput.addEventListener('change', e =>  getInputValue(e, "selectedPlan"))
})

addonsInputs.forEach(addonInput => {
    addonInput.addEventListener('change', e =>  getInputValue(e, "selectedAddons"))
})
userName.addEventListener('change', e =>  getInputValue(e, "userName"))
userMail.addEventListener('change', e =>  getInputValue(e, "userMail"))
userTel.addEventListener('change', e =>  getInputValue(e, "userTel"))



const links = document.querySelectorAll("a[data-step]");
const multiFromSteps = document.querySelectorAll('.multiform-step')




window.addEventListener('popstate', () => {
  
    
    const getAnchor = window.location.hash.substr(1)

     links.forEach(link => {
        const getAttribute = link.getAttribute('data-step')
         if(getAttribute === getAnchor) {
         link.classList.add("step-active")
         }else {
         link.classList.remove("step-active")
         }
     })
    multiFromSteps.forEach(step => {
            if(step.classList.contains('step-active')) {
                step.classList.remove('step-active')
            }
            if(step.getAttribute('data-step') === getAnchor) {
                step.classList.add('step-active')
            }
            if(getAnchor === '') multiFromSteps[0].classList.add('step-active')

        })

        const addonsPrice = formValues.selectedAddons.map(item => Number(item.price))
        const totalPrice = [...addonsPrice, Number(formValues.selectedPlan.price)]

        
       
        selectedPlan.textContent = formValues.selectedPlan.plan
        selectedPlanPrice.textContent = `${formValues.selectedPlan.price}$`
        selectedAddonsList.textContent = ""
        if(!formValues.selectedAddons.length) selectedAddonsList.innerHTML = `<li><span class="summary-addon">No add-ons selected</span></li>`
        formValues.selectedAddons.forEach(addon => {
          const li =  document.createElement("li");
          const spanAddon = document.createElement('span')
          const spanAddonPrice = document.createElement('span')
          spanAddon.classList.add('summary-addon')
          spanAddonPrice.classList.add('summary-addon-price')
          spanAddon.textContent = addon.name
          spanAddonPrice.textContent = `${addon.price}$`
          li.appendChild(spanAddon)
          li.appendChild(spanAddonPrice)
          selectedAddonsList.appendChild(li)
        })

      const logTotalPrice = totalPrice.reduce((acc, currentValue) => acc + currentValue, 0)

      priceTotal.textContent = `${logTotalPrice}$`
    
})
