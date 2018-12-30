

export function readImageAsBase64EncodedString(fileBlob, callback) {
    const reader = new FileReader();

    reader.onload = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(fileBlob);
}
