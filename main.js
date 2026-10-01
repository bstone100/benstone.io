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

/* Let's modify this so that we transition the image container instead of the image.
*  The thumbnail container is the button, and the dialog container is a div, both .photo-container.
*/
buttons.forEach(button => {
    const dialog = document.getElementById(button.dataset.dialog); // get the correct dialog
    const dialogContainer = dialog.querySelector(".photo-container");

    button.addEventListener("click", () => {
        // expand the thumbnail image to full screen with an animation
        if (document.startViewTransition) {
            button.style.viewTransitionName = button.dataset.dialog; // makes browser take "old" snapshot of thumbnail
            document.startViewTransition(() => {
                button.style.viewTransitionName = "";
                dialogContainer.style.viewTransitionName = button.dataset.dialog; // makes browser take "new" snapshot of full image
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
                    dialogContainer.style.viewTransitionName = "";
                    button.style.viewTransitionName = button.dataset.dialog;
                    dialog.close();
                });
                t.finished.then(() => {
                    // remove after closing so that animation doesn't get triggered when this isn't the target image
                    button.style.viewTransitionName = "";
                });
            } else {
                dialog.close();
            }
        }
    });
});