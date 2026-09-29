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

const buttons = document.querySelectorAll("button.btn--photo");

buttons.forEach(button => {
    const dialog = document.getElementById(button.dataset.dialog); // get the correct dialog
    const dialogImage = dialog.querySelector("img");
    const thumbnailImage = button.querySelector("img");

    button.addEventListener("click", () => {
        // expand the thumbnail image to full screen with an animation
        if (document.startViewTransition) {
            thumbnailImage.style.viewTransitionName = button.dataset.dialog; // makes browser take "old" snapshot of thumbnail
            document.startViewTransition(() => {
                thumbnailImage.style.viewTransitionName = "";
                dialogImage.style.viewTransitionName = button.dataset.dialog; // makes browser take "new" snapshot of full image
                dialog.showModal();
            });
        } else {
            dialog.showModal();
        }
    });

    // shrink the full screen image back to its thumbnail with an animation
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            if (document.startViewTransition) {
                // browser will take "old" snapshot of dialog image before callback is processed
                const t = document.startViewTransition(() => {
                    // before closing dialog, transfer name to thumbnail so that the browser makes the thumbnail the "new" snapshot
                    dialogImage.style.viewTransitionName = "";
                    thumbnailImage.style.viewTransitionName = button.dataset.dialog;
                    dialog.close();
                });
                t.finished.then(() => {
                    // remove after closing so that animation doesn't get triggered when this isn't the target image
                    thumbnailImage.style.viewTransitionName = "";
                });
            } else {
                dialog.close();
            }
        }
    });
});