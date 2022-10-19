const containerDiv = document.querySelector('.container');
const dialogElement = document.querySelector('#single-country-modal');

const baseURL = 'https://restcountries.com/v3.1';

const fetchAllCounties = async () => {
    await fetch(`${baseURL}/all?fields=name,flags,cca2`)
    .then(response => response.json())
    .then(data => {
        data.forEach((country) => {
            const countryButton = document.createElement('button');
            countryButton.classList.add('country-button');

            countryButton.setAttribute('data-iso', country.cca2.toLowerCase());

            countryButton.innerHTML = `
                <img width="20px" src="${country.flags.png}" >
                <span>${country.name.official}</span>
            `

            containerDiv.append(countryButton);
        })
    })
};

fetchAllCounties()
    .then(() => {
        const buttons = document.querySelectorAll('.country-button');
        
        buttons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                const currentButton = event.currentTarget;

                const cca2 = currentButton.getAttribute('data-iso');
                
                const response = await fetch(`${baseURL}/alpha/${cca2}`)
                const data = await response.json();

                fillDialogWithData(data[0]);
                dialogElement.showModal();

                const closeModalButton = document.querySelector('.close-button');
                closeModalButton.addEventListener('click', () => dialogElement.close())
            })
        })
        
    });

const fillDialogWithData = (country) => {
    console.log(country)
    dialogElement.innerHTML = `
        <div class="dialog-inner-container">
            <button class="close-button">
                <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <header>
                <img width="100px" src="${country.coatOfArms.png}">
                <div>
                    <h1>${country.name.official}</h1>
                    <p>${country.capital[0]}</p>
                </div>
            </header>
        </div>
    `
}
