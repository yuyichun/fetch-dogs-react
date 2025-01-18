import React, { useState, useEffect, useCallback } from "react";
import Confetti from "react-confetti";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, TablePagination, TableFooter, TableRow, TableHead, TableCell, TableBody, Table } from "@mui/material";

import Filter from "../../components/Filter";
import MatchDialog from "../../components/MatchDialog";

import { getBreeds, searchDogs, getDogsByIds, matchDogs } from "../../services/dogs";

import "./Home.scss";

function Home() {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState("asc");

    // Favorites list: Stores the IDs of favorite dogs selected by the user.
    // Ideally, this should be stored in the backend for persistence and better management,
    // but since no corresponding API is provided, it is temporarily stored in the frontend state.
    const [favorites, setFavorites] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false); // control dialog open
    const [showConfetti, setShowConfetti] = useState(false); // control confetti show
    const [matchResult, setMatchResult] = useState(null);

    const fetchBreeds = async () => {
        const data = await getBreeds();
        setBreeds(data || []);
    };

    useEffect(() => {
        fetchBreeds();
    }, []);

    const fetchDogs = useCallback(async () => {
        const params = { breeds: selectedBreeds, size: pageSize, from: page * pageSize, sort: `breed:${sort}` };
        const data = await searchDogs(params);
        const ds = await getDogsByIds(data.resultIds);
        setDogs(ds);
        setTotal(data.total);
    }, [selectedBreeds, pageSize, page, sort]);

    useEffect(() => {
        fetchDogs();
    }, [fetchDogs]);

    const handleBreedSelect = (event) => {
        const {
            target: { value },
        } = event;
        if (value.includes("all") && value.length === 1) {
            setSelectedBreeds([]);
        } else {
            const filteredValues = value.filter((item) => item !== "all");
            setSelectedBreeds(filteredValues);
        }
    };

    const handleReset = () => {
        setSelectedBreeds([]);
        setSort("asc");
        setPage(0);
        setPageSize(25);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFavorite = (id) => {
        const index = favorites.indexOf(id);
        if (index === -1) {
            setFavorites([...favorites, id]);
        } else {
            setFavorites(favorites.filter((item) => item !== id));
        }
    };

    const handleMatch = async () => {
        if (favorites.length === 0) {
            alert("Please select at least one dog to match!");
            return;
        }
        try {
            const response = await matchDogs(favorites);
            const ds = await getDogsByIds([response.match]);
            setMatchResult(ds[0]);
            setShowConfetti(true);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Failed to generate match:", error);
            alert("Failed to generate match. Please try again later.");
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setShowConfetti(false);
    };

    return (
        <div className="home">
            <div className="filterWrapper">
                <div className="left">
                    <Filter breeds={breeds} selectedBreeds={selectedBreeds} sort={sort} onBreedChange={handleBreedSelect} onSortChange={(e) => setSort(e.target.value)} onReset={handleReset} />
                </div>

                <div className="right">
                    <Button variant="contained" disabled={favorites.length === 0} onClick={() => handleMatch()}>
                        ✨ Generate My Puppy Match ✨
                    </Button>
                </div>
            </div>

            <div className="dogList">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Breed</TableCell>
                            <TableCell>Zipcode</TableCell>
                            <TableCell>Collect</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dogs.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <div className="imgCover">
                                        <img src={row.img} alt={row.name} />
                                    </div>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.breed}</TableCell>
                                <TableCell>{row.zip_code}</TableCell>
                                <TableCell>
                                    <div className="favorite-icon">
                                        {favorites.includes(row.id) ? (
                                            <FavoriteIcon
                                                color="red"
                                                onClick={() => {
                                                    handleFavorite(row.id);
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderIcon
                                                onClick={() => {
                                                    handleFavorite(row.id);
                                                }}
                                            />
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                colSpan={3}
                                count={total}
                                rowsPerPage={pageSize}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            "aria-label": "dogs per page",
                                        },
                                        native: false,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {showConfetti && <Confetti style={{ zIndex: 2000 }} />}

            <MatchDialog open={isDialogOpen} matchResult={matchResult} onClose={handleCloseDialog} />
        </div>
    );
}

export default Home;
