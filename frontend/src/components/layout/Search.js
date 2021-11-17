import React, { useState } from 'react'
const Search = ({myHistory}) => {
    const [keyword, setKeyword] = useState('');
    const searchHandler = (e) => {
        e.preventDefault();  
        if(keyword.trim()) {
            myHistory.history.push(`/search/${keyword}`);
        }else{
            myHistory.history.push('/');
        }

    }
    return (
            <form onSubmit={searchHandler}>
                <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
                </div>
            </form>
    )
}
export default Search