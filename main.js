document.querySelector("#toggle-theme-button").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");
    localStorage.setItem("dark-theme", document.documentElement.classList.contains("dark-theme"));
});

document.querySelector("#image-slides-left-button").addEventListener("click", () => {
    document.querySelector("#image-slides-scroll-container").scrollLeft -= 200;
});

document.querySelector("#image-slides-right-button").addEventListener("click", () => {
    document.querySelector("#image-slides-scroll-container").scrollLeft += 200;
});

const updateDialogAnimationTarget = (button, dialog) => {
        // let's pass the thumbnail dimensions directly to the dialog
        const rect = button.getBoundingClientRect();

        // first save the transition and disable it temporarily
        const transition = dialog.style.getPropertyValue("transition");
        dialog.style.setProperty("transition", "none");

        dialog.style.setProperty("--top", `${rect.top}px`);
        dialog.style.setProperty("--left", `${rect.left}px`);
        dialog.style.setProperty("--right", `${document.documentElement.clientWidth - rect.right}px`);
        dialog.style.setProperty("--bottom", `${document.documentElement.clientHeight - rect.bottom}px`);

        // force browser to do a "style flush"
        window.getComputedStyle(dialog).inset;
        // re-enable transition
        dialog.style.setProperty("transition", transition);
}

const photos = document.querySelectorAll(".photo-group");

photos.forEach(photo => {
    const button = photo.querySelector(".photo-container");
    const dialog = photo.querySelector(".photo-dialog");

    button.addEventListener("click", () => {
        updateDialogAnimationTarget(button, dialog);
        dialog.showModal();
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            updateDialogAnimationTarget(button, dialog);
            dialog.close();
        }
    });

    // from escape key
    dialog.addEventListener("cancel", () => {
        updateDialogAnimationTarget(button, dialog);
    });
});







