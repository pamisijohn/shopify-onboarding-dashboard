// modals
const notificationBtn = document.querySelector(".notification-btn");
const userBtn = document.querySelector(".user");
const notificationModal = document.querySelector(".notification-modal");
const userModal = document.querySelector(".user-modal");

const selectPlanModal = document.querySelector(".select-plan");
const modalCloseBtn = document.querySelector(".close-modal-btn");

// document.addEventListener("click", function (event) {
//   if (
//     event.target == notificationBtn ||
//     notificationBtn.contains(event.target)
//   ) {
//     notificationModal.classList.remove("hidden");
//   } else {
//     notificationModal.classList.add("hidden");
//   }
// });

notificationBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  notificationModal.classList.remove("hidden");
  userModal.classList.add("hidden");
});

userBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  userModal.classList.remove("hidden");
  notificationModal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
  if (
    !notificationModal.contains(event.target) &&
    !notificationBtn.contains(event.target)
  ) {
    notificationModal.classList.add("hidden");
  }

  if (!userModal.contains(event.target) && !userBtn.contains(event.target)) {
    userModal.classList.add("hidden");
  }
});

// close select plan
modalCloseBtn.addEventListener("click", () => {
  selectPlanModal.style.display = "none";
});

// toggle show more information
const showMoreBtn = document.querySelector(".show-more");
const setupOptions = document.querySelector(".setup-options-container");

showMoreBtn.addEventListener("click", () => {
  const showMore = setupOptions.style.display === "flex";
  setupOptions.style.display = showMore ? "none" : "flex";

  showMoreBtn.innerHTML = showMore
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z"
                fill="#4A4A4A" />
            </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5303 12.2803C14.2374 12.5732 13.7626 12.5732 13.4697 12.2803L10 8.81066L6.53033 12.2803C6.23744 12.5732 5.76256 12.5732 5.46967 12.2803C5.17678 11.9874 5.17678 11.5126 5.46967 11.2197L9.46967 7.21967C9.76256 6.92678 10.2374 6.92678 10.5303 7.21967L14.5303 11.2197C14.8232 11.5126 14.8232 11.9874 14.5303 12.2803Z" fill="#4A4A4A"/>
</svg>`;
});

// option checkmark
const handleButton = (button, options) => {
  const {
    hiddenClass,
    checkmarkSelectedClass,
    setupCheckmarkStatus,
    setupCheckmark,
    dashedCircle,
    loadingCircle,
    reverseLoadingCircle,
    completeCircle,
  } = options;

  const handleSelected = () => {
    dashedCircle.classList.add(hiddenClass);
    loadingCircle.classList.remove(hiddenClass);
    setupCheckmarkStatus.ariaLabel = "Loading. Please wait...";

    setTimeout(() => {
      loadingCircle.classList.add(hiddenClass);
      completeCircle.classList.remove(hiddenClass);
      setupCheckmark.ariaLabel = setupCheckmark.ariaLabel.replace(
        "selected",
        "deselected"
      );
      setupCheckmarkStatus.ariaLabel = "Successfully selected";
      setupCheckmark.classList.add(checkmarkSelectedClass);
    }, 250);
  };

  const handleNotSelected = () => {
    completeCircle.classList.add(hiddenClass);
    loadingCircle.classList.add(hiddenClass);
    reverseLoadingCircle.classList.remove(hiddenClass);
    setupCheckmarkStatus.ariaLabel = "Loading. Please wait...";

    setTimeout(() => {
      reverseLoadingCircle.classList.add(hiddenClass);
      dashedCircle.classList.remove(hiddenClass);
      setupCheckmark.ariaLabel = setupCheckmark.ariaLabel.replace(
        "deselected",
        "selected"
      );
      setupCheckmarkStatus.ariaLabel = "Successfully deselected";
      setupCheckmark.classList.remove(checkmarkSelectedClass);
    }, 250);
  };

  const handleSelectedOrNot = () => {
    const isSelected = setupCheckmark.classList.contains(
      checkmarkSelectedClass
    );

    if (isSelected) {
      handleNotSelected();
    } else {
      handleSelected();
    }
  };

  button.addEventListener("click", handleSelectedOrNot);
};

const setupButtons = () => {
  const hiddenClass = "hidden";
  const checkmarkSelectedClass = "checkmark-selected";

  const buttons = document.querySelectorAll(".setup-checkmark");

  buttons.forEach((button) => {
    const dashedCircle = button.querySelector(".dashed-circle-icon");
    const loadingCircle = button.querySelector(".loading-circle-icon");
    const reverseLoadingCircle = button.querySelector(
      ".reverse-loading-circle-icon"
    );
    const completeCircle = button.querySelector(".complete-circle-icon");
    const setupCheckmarkStatus = button.nextElementSibling;

    handleButton(button, {
      hiddenClass,
      checkmarkSelectedClass,
      setupCheckmarkStatus,
      setupCheckmark: button,
      dashedCircle,
      loadingCircle,
      reverseLoadingCircle,
      completeCircle,
    });
  });
};

setupButtons();

// accordion effect
document.querySelectorAll(".setup-option").forEach((option) => {
  const header = option.querySelector("h1.text");
  const action = option.querySelector(".accordion-content");
  // const img = option.querySelector(".option-image");

  // Function to toggle active class
  const toggleActive = () => {
    const isActive = option.classList.contains("active");

    // Hide/show the setup-action except the h1
    action.querySelectorAll(":not(h1)").forEach((el) => {
      el.style.display = isActive ? "none" : "";
    });

    // img.querySelectorAll(".option-image").forEach(() => {
    //   img.style.display = isActive ? "none" : "";
    // });

    // Toggle active class
    option.classList.toggle("active");

    // Optional: Close other open sections
    document.querySelectorAll(".setup-option").forEach((other) => {
      if (other !== option && other.classList.contains("active")) {
        other.classList.remove("active");
        other
          .querySelector(".setup-action")
          .querySelectorAll(":not(h1)")
          .forEach((el) => {
            el.style.display = "none";
          });
      }
    });
  };

  // Add event listener to the setup-option container and the setup-checkmark button
  [option, option.querySelector(".setup-checkmark")].forEach((el) => {
    el.addEventListener("click", (event) => {
      // Prevent event triggering more than once if setup-checkmark is clicked
      if (
        !event.target.classList.contains("setup-checkmark") ||
        event.currentTarget === event.target
      ) {
        toggleActive();
      }
    });
  });

  // Initially hide all setup-action content except h1
  action.querySelectorAll(":not(h1)").forEach((el) => {
    el.style.display = "none";
  });
});
