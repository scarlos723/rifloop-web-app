const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadRaffleImages = async (files: File[]): Promise<string[]> => {
  try {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file); // Archivo a subir
      formData.append("upload_preset", "preset-rifloop"); // Nombre del preset configurado en Cloudinary
      formData.append("folder", "raffles_images");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error uploading file ${file.name}`);
      }

      const data = await response.json();
      uploadedUrls.push(data.secure_url); // URL segura del archivo subido
    }

    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    throw error;
  }
};
