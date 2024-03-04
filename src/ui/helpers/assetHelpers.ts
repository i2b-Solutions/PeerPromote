import { Data } from "@domain/entities/data";
import { STATUS } from "@domain/entities/status";
import Resizer from "react-image-file-resizer";

const imageAssetDirectory = `${process.env.PUBLIC_URL}/assets/images`;

export const createImageAssetUrl = (image: string) =>
  `${imageAssetDirectory}/${image}`;

const createEmptyImage = async (): Promise<File> => {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#bdc3c7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });

    if (blob) {
      const file = new File([blob], "empty_image.jpg", { type: "image/jpeg" });
      return file;
    }
  }

  // Si hubo un problema o el contexto 2D no está disponible, devolvemos un archivo vacío
  const emptyBlob = new Blob([""], { type: "image/jpeg" });
  return new File([emptyBlob], "empty_image.jpg", { type: "image/jpeg" });
};

export const resizeImage = (
  imageFile: File | undefined
): Promise<Data<File>> => {
  return new Promise(async (resolve) => {
    if (!imageFile) {
      const emptyImage = await createEmptyImage();
      resolve({
        data: emptyImage,
        message: "No image was provided",
        status: STATUS.ERROR,
      });
      return;
    }

    const quality = 70;
    const maxSize = 500;
    const outputType = "JPEG";
    const rotation = 0;

    try {
      Resizer.imageFileResizer(
        imageFile,
        maxSize,
        maxSize,
        outputType,
        quality,
        rotation,
        (resizedFile) => {
          if (typeof resizedFile === "object" && resizedFile instanceof File) {
            resolve({
              data: resizedFile,
              message: "Image resized successfully.",
              status: STATUS.OK,
            });
          } else {
            resolve({
              data: imageFile,
              message: "Failed to resize the image.",
              status: STATUS.ERROR,
            });
          }
        },
        "file"
      );
    } catch (error) {
      resolve({
        data: imageFile,
        message: "An error occurred while resizing the image.",
        status: STATUS.ERROR,
      });
    }
  });
};
