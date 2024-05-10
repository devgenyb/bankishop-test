import { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Box, Button, Input, Typography } from "@mui/material";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import FormImage from "@/Components/FormImage";
import InputFile from "@/Components/InputFile";

const maxFilesCount = 5;

function Test({errors}) {
    const [files, setFiles] = useState([]);

    const sendHandler = () => {
        const data = new FormData();
        files.forEach((file) => data.append("files[]", file.file));
        router.post("image-form", data);
    };

    useEffect(() => {
        for (let key in errors) {
            toast.error(errors[key])
        }
        if (errors.entries) return
    }, [errors])

    return (
        <MainLayout>
            <Box maxWidth={400} margin={"0 auto"}>
                <Box
                    alignItems="center"
                    display="flex"
                    gap={2}
                    p={2}
                    flexDirection="column"
                >
                    <Typography>Добавить изображения</Typography>
                    {!!files.length && (
                        <Box>
                            {files.map((file) => (
                                <FormImage file={file} key={file.file.name} />
                            ))}
                        </Box>
                    )}
                    {files.length < maxFilesCount ? (
                        <InputFile
                            addFile={(file) =>
                                setFiles((prev) => [...prev, file])
                            }
                        />
                    ) : (
                        <Typography>
                            Добавлено максимальное кол-во {maxFilesCount}
                        </Typography>
                    )}
                    <Box>
                        <Button color="error" onClick={() => setFiles([])}>
                            Очистить
                        </Button>
                        <Button disabled={!files.length} onClick={sendHandler}>
                            Отправить
                        </Button>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
}

export default Test;
