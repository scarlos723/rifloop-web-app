import { ImageIcon, PackagePlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropZoneFiles = (props: {
  onDropFnc: (value: File[]) => void;
  maxFiles?: number;
  onlyImages?: boolean;
}) => {
  const { onDropFnc, maxFiles, onlyImages } = props;

  const [listFiles, setListFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (maxFiles && acceptedFiles.length > maxFiles) return;

    setListFiles((prev) => {
      const newFiles = [...prev, ...acceptedFiles];
      if (maxFiles && newFiles.length > maxFiles) {
        return newFiles.slice(0, maxFiles);
      }
      onDropFnc(newFiles);
      return newFiles;
    });
  }, []);

  const onRemoveFile = (file: File) => {
    setListFiles((prev) => {
      const newFiles = prev.filter((f) => f.name !== file.name);
      onDropFnc(newFiles);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: onlyImages ? { "image/*": [] } : undefined,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 rounded-md  shadow"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm text-gray-500">Suelta los archivos aquí ...</p>
        ) : (
          <div className="text-sm text-gray-500 text-center flex flex-col gap-1 items-center">
            <div>{!onlyImages ? <ImageIcon /> : <PackagePlusIcon />}</div>
            <p className="cursor-default">
              Arrastra y suelta algunos archivos aquí, o haz clic para
              seleccionar archivos
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {listFiles.map((file, i) => (
          <div key={i} className="text-sm text-gray-700 border px-3 rounded-sm">
            <span>
              - {file.name} - {file.size} bytes
            </span>
            <button
              type="button"
              className="text-red-500 ml-2"
              onClick={() => onRemoveFile(file)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
