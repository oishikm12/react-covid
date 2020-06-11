import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { getCountries } from '../../api/index';

import styles from './Countries.module.css';

function Countries(prop) {

    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        async function fetchCountries() {
            setAllCountries(await getCountries());
        }
        fetchCountries();
    }, [setAllCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => prop.countryChange(e.target.value)}>
                <option value='Global'>Global</option>
                {allCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default Countries