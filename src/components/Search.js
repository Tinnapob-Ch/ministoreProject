import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false); // เพิ่ม state เพื่อตรวจสอบว่าต้องแสดงผลลัพธ์หรือไม่

    const handleInputChange = async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchValue(searchTerm);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchValue.trim() !== '') {
                    const response = await axios.get(`https://localhost:7137/api/sneakers`);
                    const filteredResults = response.data.filter(sneaker => sneaker.name.toLowerCase().includes(searchValue));
                    setSearchResults(filteredResults);
                    setShowResults(true); // แสดงผลลัพธ์ที่ได้ในทุกรอบการค้นหา
                } else {
                    setSearchResults([]); // ล้างผลลัพธ์เมื่อไม่มีการพิมพ์
                    setShowResults(false); // ไม่ต้องแสดงผลลัพธ์เมื่อไม่มีการพิมพ์
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchValue]);

    return (
        <div className="Search-container">
            <input
                type="text"
                className="Search-input"
                placeholder="Enter Search"
                value={searchValue}
                onChange={handleInputChange}
            />
            {showResults && searchResults.length > 0 && (
                <ul className="Search-results">
                    {searchResults.map((sneaker, index) => (
                        <li key={index}>{sneaker.name}</li>
                    ))}
                </ul>
            )}
            {showResults && searchResults.length === 0 &&  <div className="Search-no-result">No results</div>}
        </div>
    );
    
}

export default Search;
