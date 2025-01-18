import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import request from "../../services/request";
import "./Navbar.scss";

function Navbar() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await request.post("/auth/logout", {}, { withCredentials: true });
        navigate("/login");
    };
    return (
        <div className="navbar">
            {/* <div className="left">
                <Link className="link" to="/">
                    Home
                </Link>
                <Link className="link" to="/Favorites">
                    Favorites
                </Link>
            </div> */}
            <div className="center">
                <Link className="link" to="/">
                    <img src="/imgs/dog-icon.png" alt="" className="logo" />
                    <span>Fetch Dogs</span>
                </Link>
            </div>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src="" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </div>
    );
}

export default Navbar;
