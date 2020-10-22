import React, { useState } from 'react';
import { connect } from 'react-redux';

import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import './searchBar.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { fetchStocks } from '../../redux/modules/stock';
import { API_URL, API_KEY } from '../../redux/config';

const Option = props => {
    return (
        <components.Option {...props}>
            <div className='custom-option'>
                <span className='left'>{props.data.label}</span>
                <span className='right'>{props.data.companyName}</span>
            </div>
        </components.Option>
    )
}

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState({});
    const [query, setQuery] = useState('');

    const handleInputChange = (newValue) => {
        const newInputValue = newValue.replace(/\W/g, '');

        if (newInputValue === '' && inputValue !== '') {
            setQuery(inputValue);
            setValue({
                value: inputValue,
                label: inputValue
            });
        }

        setInputValue(newInputValue);
        setValue({
            value: newInputValue,
            label: newInputValue
        });
    }

    const promiseOptions = newValue => {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}?function=SYMBOL_SEARCH&keywords=${newValue}&apikey=${API_KEY}`)
                .then(response => response.json())
                .then(({ bestMatches }) => {
                    resolve(bestMatches.map((obj) => {
                        const values = Object.values(obj);
                        return {
                            value: values[0],
                            label: values[0],
                            companyName: values[1],
                        };
                    }));
                })
                .catch(reject);
        });
    }

    const noOptionsMessage = () => {
        return 'No Search Result';
    };

    const handleChange = option => {
        setValue(option);

        props.fetchStocks({
            query: option.value
        });
    };

    const onSearch = () => {
        setValue({
            value: query,
            label: query
        });
        
        props.fetchStocks({
            query: query
        });

        setQuery('');
    };

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item>
                <AsyncSelect
                    className='select-search'
                    cacheOptions
                    isSearchable
                    noOptionsMessage={noOptionsMessage}
                    loadOptions={promiseOptions}
                    defaultOptions
                    value={value}
                    components={{Option}}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={onSearch}>Search</Button>
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchStocks:(params) => dispatch(fetchStocks(params)),
});
  
export default connect(null, mapDispatchToProps)(SearchBar);