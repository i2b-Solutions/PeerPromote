import React, { useState } from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { DidactGothicFontSizes } from '@theme/fontSizes';
import { Colors, colorWithOpacity } from '@theme/colors';

const dropAreaColor = colorWithOpacity(Colors.main.purple, 0.15);

const DropArea = styled('div')(({ isInteracting }: { isInteracting: boolean }) => ({
    border: `2px dashed ${Colors.main.blue}`,
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    backgroundColor: isInteracting ? dropAreaColor : 'transparent',
    '&:hover': {
        backgroundColor: dropAreaColor,
    },
}));

const FileUploadArea: React.FC<{ onFileSelect: (file: File) => void }> = ({
    onFileSelect,
}) => {

    const [file, setFile] = useState<File | null>(null);
    const [isInteracting, setIsInteracting] = useState<boolean>(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            onFileSelect(selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsInteracting(false);
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const droppedFile = event.dataTransfer.items[0].getAsFile();
            if (droppedFile) {
                setFile(droppedFile);
                onFileSelect(droppedFile);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsInteracting(true);
    };

    const handleDragLeave = () => {
        setIsInteracting(false);
    };

    const handleClick = () => {
        setIsInteracting(true);
    };

    const handleBlur = () => {
        setIsInteracting(false);
    };

    return (
        <DropArea
            isInteracting={isInteracting}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onBlur={handleBlur}
        >
            <input
                type="file"
                accept=".jpeg, .jpg"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                id="file-input"
            />
            {file ?
                <Typography variant="body1">Archivo seleccionado: {file.name}</Typography>
                :
                <label htmlFor="file-input">
                    <Typography variant="body1" fontWeight={DidactGothicFontSizes.BOLD}>Arrastra y suelta una imagen aquí</Typography>
                    <Typography variant="body2">o haz clic para seleccionar un archivo</Typography>
                </label>}
        </DropArea>
    );
};

export default FileUploadArea;
