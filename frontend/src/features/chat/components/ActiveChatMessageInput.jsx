import { useRef, useState, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';
import ActiveChatImagePreview from './ActiveChatImagePreview';

export default function ActiveChatMessageInput({ chatId, onSend, isSendingMessage }) {
    const [messageText, setMessageText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMessageText('');
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [chatId]);

    useEffect(() => {
        if (!selectedImage) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedImage);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedImage]);

    function handleImageChange(event) {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedImage(file);
        }
    }

    function handleRemovePreviewImage() {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const text = messageText.trim();

        if ((!text && !selectedImage) || isSendingMessage) {
            return;
        }

        const formData = new FormData();

        if (text) {
            formData.append('text', text);
        }

        if (selectedImage) {
            formData.append('messageImage', selectedImage);
        }

        onSend(formData, {
            onSuccess: () => {
                setMessageText('');
                handleRemovePreviewImage();
            },
        });
    }

    return (
        <div className="relative shrink-0">
            {selectedImage && (
                <div className="absolute bottom-full left-2 mb-2">
                    <ActiveChatImagePreview
                        image={selectedImage}
                        previewUrl={previewUrl}
                        onRemove={handleRemovePreviewImage}
                    />
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                />

                <button
                    type="button"
                    disabled={isSendingMessage}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 flex items-center justify-center shrink-0 text-gray-400 border rounded-xs border-gray-200 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50 transition-colors"
                    aria-label="Attach image"
                >
                    <Paperclip className="h-4 w-4" />
                </button>

                <input
                    type="text"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    placeholder={isSendingMessage ? 'Sending...' : 'Type your message...'}
                    disabled={isSendingMessage}
                    className="flex-1 rounded-xs bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 disabled:opacity-50 transition"
                />

                <button
                    type="submit"
                    disabled={isSendingMessage || (!messageText.trim() && !selectedImage)}
                    className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xs text-white bg-gray-500 hover:bg-gray-600 disabled:opacity-50 transition"
                    aria-label="Send message"
                >
                    <Send className="h-4 w-4" />
                </button>
            </form>
        </div>
    );
}