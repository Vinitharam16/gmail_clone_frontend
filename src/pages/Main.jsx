import React, { Suspense, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../components/common/SuspenseLoader";
import { Box } from "@mui/material";

export default function Main() {
    const [openDrawer, setOpenDrawer] = useState(true);

    function toggleDrawer() {
        setOpenDrawer(prevState => !prevState);
    }

    return (
        <>
            <Header toggleDrawer={toggleDrawer} />
            <Box>
                <Sidebar openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
                <Suspense fallback={<SuspenseLoader />}>
                    <Outlet context={{openDrawer}}/>
                </Suspense>
            </Box>
        </>
    );
}