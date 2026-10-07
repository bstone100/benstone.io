// this script will be deferred or run at the bottom of <body>
// use it for registering event handlers but not for anything affecting the initial page render
// inline those scripts instead

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

const tabAnchors = document.querySelectorAll(".pill-tabs .pill");
const tabSections = document.querySelectorAll(".tab-section");

// when the user clicks a different tab
window.addEventListener("hashchange", (event) => {

    validateHash();

    tabAnchors.forEach(tabAnchor => {
        if (tabAnchor.dataset.section === location.hash) {
            tabAnchor.classList.add("current");
        } else {
            tabAnchor.classList.remove("current");
        }
    });

    const oldHash = new URL(event.oldURL).hash;

    let oldSection;
    let newSection;

    tabSections.forEach(tabSection => {
        if (tabSection.dataset.section === location.hash) {
            tabSection.classList.add("current");
            tabSection.classList.remove("previous");
            newSection = tabSection;
        } else if (tabSection.dataset.section === oldHash) {
            tabSection.classList.remove("current");
            tabSection.classList.add("previous");
            oldSection = tabSection;
        } else {
            tabSection.classList.remove("current");
            tabSection.classList.remove("previous");
        }
    });

    // we want to animate the current section in and the previous section out
    // animation direction depends on tab index

    const oldIndex = sections.indexOf(oldHash);
    const newIndex = sections.indexOf(location.hash);

    if (oldIndex === -1) return;

    let animationDirection = newIndex - oldIndex > 0 ? "right-to-left" : "left-to-right";

    newSection.classList.add(animationDirection);

});






