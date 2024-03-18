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
  onImageLoad?: (loaded: boolean) => void;
  description: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
    if (onImageLoad) onImageLoad(true);
  };

  useEffect(() => {
    setLoaded(false);
    if (onImageLoad) onImageLoad(false);
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
  textVariant = "h2",
  imageBordeRadius = "0",
  textMargin = "0",
  textPadding = "0",
  textPosition = "top",
  shadow = false
}: {
  url: string;
  style?: React.CSSProperties;
  text: string;
  description: string;
  textVariant?: TypographyProps["variant"];
  imageBordeRadius?: string;
  textMargin?: string;
  textPadding?: string;
  textPosition?: "top" | "bottom";
  shadow?: boolean;
}) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const positionStyle =
    textPosition === "top"
      ? {
          top: 0,
          marginTop: textMargin
        }
      : {
          bottom: 0,
          marginBottom: textMargin
        };

  const handleImageLoad = (loaded: boolean) => {
    setImageLoaded(loaded);
  };

  return (
    <Box sx={{ position: "relative", ...style }}>
      <AppImage
        description={description}
        url={url}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: imageBordeRadius,
          boxShadow: shadow ? "4px 4px 8px 0 rgba(0,0,0,0.3)" : "unset"
        }}
        onImageLoad={handleImageLoad}
      />
      {imageLoaded && (
        <Typography
          variant={textVariant}
          fontWeight={PoppinsFontWeights.BOLD}
          color={Colors.main.white}
          sx={{
            position: "absolute",
            bottom: "unset",
            left: 0,
            width: "100%",
            textAlign: "center",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 1)",
            paddingLeft: textPadding,
            paddingRight: textPadding,
            display: "block",
            ...positionStyle
          }}
        >
          {t(text)}
        </Typography>
      )}
    </Box>
  );
};
