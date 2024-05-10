import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import {
    Box,
    Button,
    Grid,
    Menu,
    MenuItem,
    Modal,
    Pagination,
    Typography,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { router } from "@inertiajs/vue3";
import GalleryItemCard from "@/Components/GalleryItemCard";

const reloadPage = ({ page, sort, sortDirection, perpage }) => {
    const query = new URLSearchParams();
    query.append("page", page);
    query.append("sort", `${sort}:${sortDirection}`);
    query.append("per-page", perpage);

    router.visit(
        window.location.origin +
            window.location.pathname +
            "?" +
            query.toString()
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const Gallery = ({ images, page, perPage, sort, countpage }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalImage, setModalImage] = React.useState(null);
    const handleOpen = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const update = (params = {}) => {
        reloadPage({
            page,
            sort: sort[0],
            sortDirection: sort[1],
            perpage: perPage,
            ...params,
        });
    };

    const pageChange = (e, value) => {
        update({
            page: value,
        });
    };

    const handleSort = (name, direction) => {
        update({ sort: name, sortDirection: direction });
    };

    const handlePerPage = (val) => {
        if (+perPage === +val) {
            return handleClose();
        }
        update({ perpage: val });
    };

    return (
        <MainLayout>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <Box sx={style}>
                    <img src={modalImage} />
                </Box>
            </Modal>
            <Box
                sx={{
                    width: "100%",
                    background: "#eee",
                    padding: "1rem 1rem",
                    borderRadius: "10px",
                    margin: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mr: 1 }}>Сортировать по:</Typography>
                    <Typography
                        sx={{ mr: 3, cursor: "pointer" }}
                        onClick={() =>
                            handleSort(
                                "name",
                                sort[1] === "asc" ? "desc" : "asc"
                            )
                        }
                    >
                        Названию
                        <TableSortLabel
                            active={sort[0] === "name"}
                            direction={sort[1] === "asc" ? "asc" : "desc"}
                        />
                    </Typography>
                    <Typography
                        sx={{ mr: 3, cursor: "pointer" }}
                        onClick={() =>
                            handleSort(
                                "updated_at",
                                sort[1] === "asc" ? "desc" : "asc"
                            )
                        }
                    >
                        Дате
                        <TableSortLabel
                            active={sort[0] === "updated_at"}
                            direction={sort[1] === "asc" ? "asc" : "desc"}
                        />
                    </Typography>
                </Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    Показать по {perPage}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={() => handlePerPage(5)}>5</MenuItem>
                    <MenuItem onClick={() => handlePerPage(15)}>15</MenuItem>
                    <MenuItem onClick={() => handlePerPage(25)}>25</MenuItem>
                </Menu>
            </Box>
            <Grid container spacing={2}>
                {images.map((item) => (
                    <Grid key={item.name} item xs={12} sm={6} md={4}>
                        <GalleryItemCard
                            image={item}
                            setModalOpen={handleOpen}
                            setImageHref={setModalImage}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{
                    margin: "2rem 0",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Pagination
                    count={countpage}
                    page={page}
                    color="primary"
                    onChange={pageChange}
                />
            </Box>
        </MainLayout>
    );
};

export default Gallery;
