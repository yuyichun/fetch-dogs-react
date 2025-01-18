import React from "react";
import { Select, MenuItem, InputLabel, OutlinedInput } from "@mui/material";
import "./Filter.scss";

const Filter = ({ breeds, selectedBreeds, sort, onBreedChange, onSortChange, onReset }) => {
    return (
        <div className="filter">
            <div className="filterItem">
                <InputLabel id="breed">Breed</InputLabel>
                <Select 
                    style={{ width: "200px" }} 
                    labelId="breed" 
                    id="breed" 
                    multiple 
                    value={selectedBreeds.length === 0 ? ["all"] : selectedBreeds} 
                    onChange={onBreedChange} 
                    input={<OutlinedInput label="Breed" />}
                    >
                    <MenuItem value="all">All</MenuItem>
                    {breeds.map((breed) => (
                        <MenuItem key={breed} value={breed}>
                            {breed}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className="filterItem">
                <InputLabel id="sort">Sort</InputLabel>
                <Select style={{ width: "200px" }} labelId="sort" id="sort" value={sort} onChange={onSortChange}>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </div>
            <div className="filterItem reset">
                <span onClick={onReset}>reset</span>
            </div>
        </div>
    );
};

export default Filter;
