import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function FileUploadZone({
  value,
  onChange,
  onError,
  className = "",
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || "");

  const validateFile = (file) => {
    if (!file) {
      return null;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError?.("Only JPG, PNG or WebP images are allowed.");
      return null;
    }

    if (file.size > MAX_SIZE_BYTES) {
      onError?.("Image must be 5MB or smaller.");
      return null;
    }

    return file;
  };

  const handleFile = (file) => {
    const valid = validateFile(file);
    if (!valid) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreviewUrl(dataUrl);
      onChange?.(dataUrl, valid);
    };
    reader.readAsDataURL(valid);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const clearPreview = () => {
    setPreviewUrl("");
    onChange?.("", null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Trip Cover Image
      </label>

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <img
            src={previewUrl}
            alt="Cover preview"
            className="aspect-video w-full object-cover"
          />
          <button
            type="button"
            onClick={clearPreview}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-gray-600 shadow hover:text-red-600"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
          }`}
        >
          <ImagePlus size={32} className="text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Upload an image or drag & drop
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG or WebP, max 5MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

export default FileUploadZone;
