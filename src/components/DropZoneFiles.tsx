import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const DropZoneFiles = (props: {
  onDropFnc: (value: File[]) => void;
  maxFiles?: number;
  onlyImages?: boolean;
}) => {
  const { onDropFnc, maxFiles, onlyImages } = props;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (maxFiles && acceptedFiles.length > maxFiles) return;
    onDropFnc(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: onlyImages ? { "image/*": [] } : undefined,
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4 rounded-md ">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aquí ...</p>
      ) : (
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          archivos
        </p>
      )}
    </div>
  );
};
