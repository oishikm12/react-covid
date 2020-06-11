import React from 'react';

import {Cards, Charts, Countries} from './components/index';

import styles from './App.module.css';

import {fetchData} from './api/index';

import headImg from './img/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: undefined,
    }

    async componentDidMount() {
        const response = await fetchData();
        this.setState({data: response});
    }

    async countryChange(params) {
        if (params === 'Global') params = undefined;
        const response = await fetchData(params);
        this.setState({data: response, country: params});
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} alt="COVID 19" src={headImg}/>
                <Cards data={data} />
                <Countries countryChange={this.countryChange.bind(this)}/>
                <Charts data={data} country={country}/>
            </div>
        );
    }
}


export default App;