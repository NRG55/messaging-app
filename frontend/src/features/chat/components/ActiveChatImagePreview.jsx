import { X } from 'lucide-react';

export default function ActiveChatImagePreview({ image, previewUrl, onRemove }) {
    const dotIndex = image.name.lastIndexOf('.');
    const imageName = dotIndex > 0 ? image.name.slice(0, dotIndex) : image.name;
    const imageExtension = dotIndex > 0 ? image.name.slice(dotIndex) : '';

    return (
        <div className="relative flex items-center gap-3 p-2 border border-gray-200 rounded-xs bg-white">
            <button
                type="button"
                onClick={onRemove}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600"
                aria-label="Remove attached image"
            >
                <X className="h-3.5 w-3.5" />
            </button>

            <div className="h-16 w-16 shrink-0">
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Image preview"
                        className="h-full w-full object-cover rounded-xs"
                    />
                )}
            </div>

            <div className="flex flex-col pr-2">
                <span className="text-xs text-gray-700">
                    Image attached
                </span>

                <div className="flex min-w-0 max-w-22 text-[11px] text-gray-400">
                    <span className="truncate">
                        {imageName}
                    </span>

                    <span className="shrink-0">
                        {imageExtension}
                    </span>
                </div>
            </div>
        </div>
    );
}