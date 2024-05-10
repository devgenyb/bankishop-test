import dateFormater from "@/helpers/dateFormater";
import styled from "@emotion/styled";
import { router } from "@inertiajs/react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";

const WrapperImage = styled(Box, {
    shouldForwardProp: (prop) => prop !== "path",
})(({ path }) => ({
    maxWidth: "100%",
    height: "200px",
    overflow: "hidden",
    background: `url('${path}') center / cover no-repeat`,
}));

const GalleryItemCard = ({ image, setImageHref, setModalOpen }) => {
    const path = "/images/" + image.name;
    return (
        <Card>
            <CardMedia>
                <WrapperImage path={path} />
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {image.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    добавенно {dateFormater(image.created_at)}
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Button
                        onClick={() => {
                            setImageHref(path);
                            setModalOpen();
                        }}
                    >
                        Просмотр
                    </Button>
                    <Button onClick={() => {
                        router.get(window.location.href = '/download-image?image=' + image.name)
                    }}>Скачать</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GalleryItemCard;
