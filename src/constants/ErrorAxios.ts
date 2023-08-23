export const ERROR_AXIOS_TEMPLATE = {
    "message": "timeout exceeded",
    "name": "AxiosError",
    "stack": "AxiosError: timeout exceeded\n at XMLHttpRequest.handleTimeout (http://127.0.0.1:5173/bibleApp/node_modules/.vite/deps/axios.js?v=6a392d0a:1447:14)",
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": ["xhr", "http"],
        "transformRequest": [null],
        "transformResponse": [null],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, *"
        },
        "method": "get",
        "url": "https://bolls.life/get-chapter/TR/60/1/"
    },
    "code": "ECONNABORTED", "status": null
}

export const TOP_OFFSET = 20;