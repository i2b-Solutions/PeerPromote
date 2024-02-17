import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Colors, colorWithOpacity } from '@theme/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { PoppinsFontWeights } from '@theme/fontWeights';
import { useTranslation } from 'react-i18next';

type FileUploadAreaProps = {
    onFileSelect: (file: File) => void;
    file?: File;
    onClear: () => void;
    style?: React.CSSProperties;
}

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

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileSelect, onClear, style, file }) => {
    const { t } = useTranslation();
    const [isInteracting, setIsInteracting] = useState<boolean>(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            onFileSelect(selectedFile);
        }
        setIsInteracting(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsInteracting(false);
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const droppedFile = event.dataTransfer.items[0].getAsFile();
            if (droppedFile) {
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

    const handleBlur = () => {
        setIsInteracting(false);
    };

    return (
        <DropArea
            isInteracting={isInteracting}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onBlur={handleBlur}
            style={style}
        >
            <input
                type="file"
                accept=".jpeg, .jpg"
                style={{ display: 'none' }}
                onChange={(e) => {
                    e.preventDefault();
                    handleFileSelect(e);
                    e.target.value = '';
                }}
                id="file-input"
            />
            {file ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ marginRight: '0.5rem' }} variant="body1">
                        {t('drop_image_area.selected_file')}: {file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name}
                    </Typography>
                    <IconButton
                        onClick={onClear}
                        aria-label="Clear file selection">
                        <ClearIcon />
                    </IconButton>
                </div>
                :
                <label htmlFor="file-input">
                    <Typography variant="body1" 
                    fontWeight={PoppinsFontWeights.BOLD}>{t('drop_image_area.drop_here')}</Typography>
                    <Typography variant="body2">{t('drop_image_area.or_click')}</Typography>
                </label>}
        </DropArea>
    );
};

export default FileUploadArea;
