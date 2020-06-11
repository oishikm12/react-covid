import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
let calls = 0;

export async function fetchData(country) {
    apiRequests();
    let finalUrl = url;
    if (country) finalUrl = `${url}/countries/${country}`
    try {
        const { data } = await axios.get(finalUrl);

        const needed = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }

        return needed;
    } catch (err) {
        console.error(err);
    }
}

export async function dailyFetch() {
    apiRequests();
    try {
        const { data } = await axios.get(`${url}/daily`);

        const needed = data.map((daily) => ({
            confirmed: daily.confirmed.total,
            recovered: daily.recovered.total,
            deaths: daily.deaths.total,
            date: daily.reportDate,
        }));

        return needed;
    } catch (err) {
        console.error(err);
    }
}

export async function getCountries() {
    apiRequests();
    try {
        const { data } = await axios.get(`${url}/countries`);

        return data.countries.map((country) => country.name)
    } catch (err) {
        console.error(err);
    }
}

function apiRequests() {
    calls += 1;
    console.log(`API called ${calls}`);
}