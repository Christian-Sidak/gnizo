export default function sanitize(string) {
    return string.replace(/<\/?[^>]+(>|$)/g, "");
};