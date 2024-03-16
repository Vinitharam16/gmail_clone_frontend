import { AppBar, Toolbar, styled, InputBase, Box } from "@mui/material";
import React from "react";
import { Menu as MenuIcon, Search, Tune, HelpOutlineOutlined, SettingsOutlined, AppsOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { gmaillogo } from "../constants/constant";

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#f5F5F5",
    boxShadow: "none"
})

const SearchWrapper = styled(Box)({
    backgroundColor: "#EAF1F8",
    marginLeft: 80,
    borderRadius: 24,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: "0 20px",
    '& > div': {
        width: "100%",
        padding: "0 10px"
    }
});

const OptionsWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "end",
    '& > svg': {
        marginLeft: 25
    }
});

export default function Header({ toggleDrawer }) {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer}/>
                <img src={gmaillogo} alt="logo" style={{ width: 100, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase
                        placeholder="Search in mail"
                    />
                    <Tune color="action" />
                </SearchWrapper>
                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" />
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    );
}