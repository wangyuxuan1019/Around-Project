import React, { useState } from 'react';
import { Input, Space, Radio } from 'antd'

import { SEARCH_KEY } from "../constants";

const { Search } = Input;


function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState();

    const handleSearch = (value) => {
        console.log(value)
        // display error msg if needed => search type != all && value ===""
        if(searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search content!")
            return;
        }
        setError("");
        // search type + search calue => get search result
        props.handleSearch({ type: searchType, keyword: value })
    };

    //e表示event target是的event的一个属性
    // e.target.value refer to https://developer.mozilla.org/en-US/docs/Web/API/Event
    const changeSearchType = (e) => {
        console.log('radio checked', e.target.value)
        setSearchType(e.target.value);
        console.log('searchType -> ', searchType);
        //inform Home conponent => { type: all, keyword: "" }
        if (e.target.value === SEARCH_KEY.all) {
            console.log('searchType -> ', searchType);
            props.handleSearch({type: searchType, keyword: ""})
        }
    }

    return (
        // reference from https://ant.design/components/input/ Search box
        // reference from https://ant.design/components/radio/ Radio group
        <div className='search-bar'>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                disabled={searchType === SEARCH_KEY.all}
            />  
            <p className="error-msg">{error}</p>
            <Radio.Group 
                onChange = {changeSearchType} 
                value = {searchType} 
                className = "search-type-group">
                    <Radio value={SEARCH_KEY.all}>All</Radio>
                    <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                    <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
         
        // reference from https://ant.design/components/radio/ Search box
    );
}

export default SearchBar;