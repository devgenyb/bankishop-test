import { Box, Input, InputLabel } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const InputFile = ({ addFile }) => {
    const fileChangeHandler = (event) => {
        const file = event.target.files[0];
        const fileContent = new FileReader();
        fileContent.onload = () => {
            addFile({
                file,
                preview: fileContent.result,
            });
        };

        fileContent.readAsDataURL(file);
    };

    return (
        <Box>
            <InputLabel>
                <AddIcon color="success" />
                <Input
                    onChange={fileChangeHandler}
                    inputProps={{ accept: "image/*" }}
                    type="file"
                    sx={{ display: "none" }}
                />
            </InputLabel>
        </Box>
    );
};

export default InputFile;
