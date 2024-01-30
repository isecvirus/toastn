/*
This library was made by virus
all right  reserved to virus 2023

~ GitHub @ isecvirus
*/

class ToastN {
    constructor(type) {
        this.type = type;

        this.SUCCESS_COLOR = "#2e7d32";
        this.INFO_COLOR = "#0288d1";
        this.WARNING_COLOR = "#ed6c02";
        this.ERROR_COLOR = "#d32f2f";
        this.CUSTOM_COLOR = "#222222";

        this.SUCCESS_TITLE = "success";
        this.INFO_TITLE = "information";
        this.WARNING_TITLE = "warning";
        this.ERROR_TITLE = "error";
        this.CUSTOM_TITLE = "custom";

        this.SUCCESS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tn-success-icon" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`;
        this.INFO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tn-info-icon" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>`;
        this.WARNING_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tn-warning-icon" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`;
        this.ERROR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tn-error-icon" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>`;
        this.CUSTOM_ICON = ``;

        this.SUCCESS_CLASS = "tn-success";
        this.INFO_CLASS = "tn-info";
        this.WARNING_CLASS = "tn-warning";
        this.ERROR_CLASS = "tn-error";
        this.CUSTOM_CLASS = "tn-custom";

        // show close button
        this.CLOSEABLE = true;

        this.parentClassName = "toastn-container";

        if (!document.querySelector("." + this.parentClassName)) {
            const parent = document.createElement("div");
            parent.className = this.parentClassName;
            document.body.appendChild(parent);
        };
    }

    show(s, duration = 0) { // Show a new notification
        duration = duration * 1000;

        let className = this.INFO_CLASS;
        let theme = this.INFO_COLOR;
        let icon = this.INFO_ICON;
        let title = this.INFO_TITLE;

        if (this.type === ToastN.TYPE.SUCCESS) {
            className = this.SUCCESS_CLASS;
            theme = this.SUCCESS_COLOR;
            icon = this.SUCCESS_ICON;
            title = this.SUCCESS_TITLE;
        } else if (this.type === ToastN.TYPE.WARNING) {
            className = this.WARNING_CLASS;
            theme = this.WARNING_COLOR;
            icon = this.WARNING_ICON;
            title = this.WARNING_TITLE;
        } else if (this.type === ToastN.TYPE.ERROR) {
            className = this.ERROR_CLASS;
            theme = this.ERROR_COLOR;
            icon = this.ERROR_ICON;
            title = this.ERROR_TITLE;
        } else if (this.type === ToastN.TYPE.CUSTOM) {
            className = this.CUSTOM_CLASS;
            theme = this.CUSTOM_COLOR;
            icon = this.CUSTOM_ICON;
            title = this.CUSTOM_TITLE;
        }

        const uudi4 = UUIDv4();

        let loading = 100;
        let closed = false;
        const interval = duration / loading;
        let enter = false;
        let progressInterval;

        const parentEelement = document.querySelector("." + this.parentClassName);

        const notification = document.createElement("notification");
        notification.className = className;
        notification.id = `toastn-${uudi4}`;
        const id = notification.id;

        notification.style.transform = "translateX(0)";

        let notificationContent = `
        <div class='toastn-wrapper'>
            <div class='content'>
                ${icon}
                <span class='message'>${s}</span>
            </div>
        </div>`;

        notification.innerHTML = notificationContent;

        document.querySelector("." + this.parentClassName).insertBefore(notification, parentEelement.firstChild);

        if (duration) {
            notification.querySelector(".toastn-wrapper").innerHTML += `
            <div class='toastn-progress-container'>
                <progress class='${className}-progress progress-${uudi4}' value='100' max='100'></progress>
            </div>
            `;

            notification.addEventListener("mouseenter", () => {
                enter = true;
            });

            notification.addEventListener("mouseleave", () => {
                enter = false;
            });

            progressInterval = setInterval(() => {
                notification.querySelector("progress").value = loading;

                if (loading > 0 && !enter) {
                    loading -= 1;
                } else {
                    // clearInterval(progressInterval);
                }

                if (loading === 0) {
                    this.hide(id);
                    closed = true;
                    clearInterval(progressInterval);
                }
            }, interval);

        } else {
            notification.querySelector(".toastn-wrapper .content").innerHTML += `
            <button class='toastn-close'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>`;

            const closeButton = notification.querySelector('.toastn-close');
            closeButton.addEventListener('click', () => {
                this.hide(id);
            });

        };

    };

    hide(id) {
        const notification = document.getElementById(id);
        const notificationHeight = notification.clientHeight;
        notification.style.transform = "translateX(-110%)";

        const children = notification.parentElement.childNodes;
        const childrenArray = Object.values(children);
        const index = childrenArray.indexOf(notification);
        const beforeChildrens = childrenArray.slice(index + 1);
        const beforeCount = beforeChildrens.length;

        setTimeout(function () {
            if (notification) {
                notification.remove();
            };
        }, 500);
    };
};

Object.defineProperty(ToastN, "TYPE", {
    value: Object.freeze({
        SUCCESS: "success",
        INFO: "info",
        WARNING: "warning",
        ERROR: "error",
        CUSTOM: "custom"
    }),
    enumerable: true,
    writable: false,
    configurable: false
});


function UUIDv4() {
    // Generate random bytes
    var cryptoObj = window.crypto || window.msCrypto; // For cross-browser compatibility
    var byteArray = new Uint8Array(16);
    cryptoObj.getRandomValues(byteArray);

    // Set the version (4) and variant (random)
    byteArray[6] = (byteArray[6] & 0x0f) | 0x40; // version 4
    byteArray[8] = (byteArray[8] & 0x3f) | 0x80; // variant: 10xxxxxx

    // Convert the byte array to a hexadecimal string
    var hexString = Array.from(byteArray, function (byte) {
        return ('0' + byte.toString(16)).slice(-2);
    }).join('');

    // Insert dashes at the correct positions to match the UUID format
    return (
        hexString.substr(0, 8) +
        '-' +
        hexString.substr(8, 4) +
        '-' +
        hexString.substr(12, 4) +
        '-' +
        hexString.substr(16, 4) +
        '-' +
        hexString.substr(20)
    );
};