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
    button.addEventListener("click", () => {
        // get the correct dialog and open it
        const dialog = document.getElementById(button.dataset.dialog);

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        dialog.showModal();
    });
});