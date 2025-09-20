import sanitizeHtml from "sanitize-html";

const sanitizeMiddleware = (req, res, next) => {
    const sanitizeData = (data) => {
        if (typeof data === "string") {
            return sanitizeHtml(data, {
                allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "a"],
                allowedAttributes: {
                    a: ["href", "name", "target"],
                },
                allowedSchemes: ["http", "https", "mailto"],
            });
        } else if (Array.isArray(data)) {
            return data.map((item) => sanitizeData(item));
        } else if (typeof data === "object" && data !== null) {
            const sanitizedObj = {};
            for (const key in data) {
                sanitizedObj[key] = sanitizeData(data[key]);
            }
            return sanitizedObj;
        } else {
            return data;
        }
    };

    if (req.body) {
        req.body = sanitizeData(req.body);
    }

    next();
};

export default sanitizeMiddleware;