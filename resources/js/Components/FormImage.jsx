import { Box, Typography } from "@mui/material"
import React from "react"

const FormImage = ({file}) => {
    return (
        <Box sx={{pt: 2}}>
            <img src={file.preview} />
            <Typography>{file.file.name}</Typography>
        </Box>
    )
}

export default FormImage