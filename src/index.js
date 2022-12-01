import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {     
    const nameOfCountry = e.target.value.trim();
    if(nameOfCountry){
    fetchCountries(nameOfCountry).then(createMarkup).catch(error => console.log(error))
}
}

function createMarkup(arr) {       
    list.innerHTML = '';
    info.innerHTML = '';
    if (arr.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else if (arr.length === 1) {
       createList(arr)        
    }
    else {
      createCard(arr)
    }
}

function createList(arr) {
       const markup = arr.map(item => {
        return `<div class="country-block"><img src="${item.flags.svg}" alt="${item.name.official}" width="30" height='20'/>
      <h1>${item.name.official}</h1></div>
      <p><span class='country-descr-name'>Capital</span>: ${item.capital}</p>
      <p><span class='country-descr-name'>Population</span>: ${item.population}</p>
      <p><span class='country-descr-name'>Languages</span>: ${Object.values(item.languages).join(', ')}</p>`
    }).join('');
        info.innerHTML = markup;
}

function createCard(arr) {
       const markup = arr.map(item => {
        return `<li class = 'country-item'>
      <img src="${item.flags.svg}" alt="${item.name.official}" width="30" />
      <p>${item.name.official}</p>
      </li>`
    }).join('');
        list.innerHTML = markup;
}