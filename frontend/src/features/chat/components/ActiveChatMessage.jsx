export default function ActiveChatMessage({ message, currentUserId, chatType, onImageLoad }) {
    const isMe = message.sender.id === currentUserId;
    const showSenderName = chatType === 'GROUP' && !isMe;

    const hasImage = Boolean(message.imageUrl);
    const hasText = Boolean(message.text?.trim());
    const isImageOnly = hasImage && !hasText;

    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const borderCornerStyle = isImageOnly
        ? 'rounded-2xl'
        : isMe
            ? 'rounded-2xl rounded-br-none'
            : 'rounded-2xl rounded-bl-none';

    const backgroundStyle = isMe ? 'bg-gray-200' : 'bg-white';

    const bubbleStyle = `border-0 ${borderCornerStyle} ${backgroundStyle}`;

    const senderStyle = isImageOnly
        ? 'absolute left-3 top-2 px-1.5 py-0.5 rounded-lg bg-white/80'
        : `px-3 pt-2 ${hasImage ? 'pb-2' : 'pb-0'}`;

    const timeStyle = isImageOnly
        ? 'absolute bottom-2 right-2 px-1.5 py-0.5 text-[9px] text-white rounded-full bg-black/50'
        : 'self-end pr-2 pb-2 text-[9px] text-gray-400';

    return (
        <div
            className={`relative flex flex-col w-fit  min-w-0 shrink-0 overflow-hidden
                ${hasImage ? 'max-w-lg' : 'max-w-[70%]'}
                ${isMe ? 'self-end' : 'self-start'}
                ${bubbleStyle}`}
        >
            {showSenderName && (
                <span className={`text-[11px] capitalize tracking-wide text-blue-500 ${senderStyle}`}>
                    {message.sender.username}
                </span>
            )}

            {hasImage && (
                <img
                    src={message.imageUrl}
                    alt="Chat attachment"
                    onLoad={onImageLoad}
                    className="block h-auto w-full bg-white"
                />
            )}

            {hasText && (
                <p
                    className={`px-3 pb-1 text-sm text-gray-800 leading-relaxed wrap-break-words whitespace-pre-wrap ${
                        showSenderName && !hasImage ? 'pt-0' : 'pt-3'
                    }`}
                >
                    {message.text.trim()}
                </p>
            )}

            <span className={timeStyle}>
                {formattedTime}
            </span>
        </div>
    );
}