import React, { useEffect, useState } from "react";
import { createImageAssetUrl } from "@ui/helpers/assetHelpers";
import { Box, Typography, TypographyProps } from "@mui/material";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { Colors } from "@theme/colors";
import { useTranslation } from "react-i18next";

export const AppImage = ({
  url,
  style,
  onImageLoad,
  description
}: {
  url: string;
  style?: React.CSSProperties;
  onImageLoad: (loaded: boolean) => void;
  description: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
    onImageLoad(true);
  };

  useEffect(() => {
    setLoaded(false);
    onImageLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <img
      alt={description}
      src={createImageAssetUrl(url)}
      style={{ ...style, display: loaded ? "block" : "none" }}
      onLoad={handleImageLoad}
    />
  );
};

export const AppImageWithText = ({
  url,
  style,
  text,
  description,
  textVariant = "h2"
}: {
  url: string;
  style?: React.CSSProperties;
  text: string;
  description: string;
  textVariant?: TypographyProps["variant"];
}) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = (loaded: boolean) => {
    setImageLoaded(loaded);
  };

  return (
    <Box sx={{ position: "relative", ...style }}>
      <AppImage
        description={description}
        url={url}
        style={{ width: "100%", height: "auto" }}
        onImageLoad={handleImageLoad}
      />
      {imageLoaded && (
        <Typography
          variant={textVariant}
          fontWeight={PoppinsFontWeights.BOLD}
          color={Colors.main.white}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
            marginBottom: "4rem",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 1)",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            display: "block"
          }}
        >
          {t(text)}
        </Typography>
      )}
    </Box>
  );
};
