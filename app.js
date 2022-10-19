const containerDiv = document.querySelector('.container');

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
            button.addEventListener('click', (event) => {
                const currentButton = event.currentTarget;

                const cca2 = currentButton.getAttribute('data-iso');
                
                fetch(`${baseURL}/alpha/${cca2}`)
                    .then(response => response.json())
                    .then(data => console.log(data));
            })
        })
        
    });
