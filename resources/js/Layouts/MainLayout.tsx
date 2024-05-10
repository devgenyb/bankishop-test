import { AppBar, Box, Container, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress'
import { router } from '@inertiajs/react'

router.on('start', () => NProgress.start())
router.on('finish', () => NProgress.done())

const MainLayout = ({ children }) => {
    return (
        <div>
            <CssBaseline />
            <ToastContainer />
            <Box>
                <AppBar position="static">
                    <Container>
                        <Toolbar disableGutters>
                            <Box sx={{mr: 2}}><Link href="/">Галлерея</Link></Box>
                            <Box><Link href="image-form">Добавить</Link></Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Container>{children}</Container>
            </Box>
        </div>
    );
};

export default MainLayout;
