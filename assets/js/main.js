document.addEventListener(
	"DOMContentLoaded",
	function () {
		var locationPopup = setUpPopup(
			document.querySelector("#location-popup"),
			"",
			200,
		);
		var locationSidebar = setUpPopup(
			document.querySelector("#location-sidebar"),
			".sidebar-open",
		);

		var menuSidebar = setUpPopup(
			document.querySelector("#menu-sidebar"),
			".menu-open",
		);

		var bannerSwiper = new Swiper(document.querySelector("#banner-swiper"), {
			loop: true,
			navigation: {
				nextEl: ".arrow-right",
				prevEl: ".arrow-left",
			},
			slidesPerView: 3,
			spaceBetween: 10,
			breakpoints: {
				100: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				900: {
					slidesPerView: 3,
				},
			},
		});

		var categorySwiper = new Swiper(
			document.querySelector("#category-swiper"),
			{
				loop: true,
				navigation: {
					nextEl: ".arrow-right",
					prevEl: ".arrow-left",
				},
				spaceBetween: 10,
				slidesPerView: "auto",
				loopedSlides: 8,
				centeredSlides: true,
			},
		);

		var productSwiper = new Swiper(document.querySelector("#product-group"), {
			loop: true,
			navigation: {
				nextEl: ".arrow-right",
				prevEl: ".arrow-left",
			},
			// spaceBetween: 30,
			slidesPerView: "auto",
			loopedSlides: 5,
			breakpoints: {
				100: {
					centeredSlides: true,
				},
				769: {
					centeredSlides: false,
				},
			},
		});

		var recentSwiper = new Swiper(
			document.querySelector("#recently"),
			{
				loop: true,
				navigation: {
					nextEl: ".arrow-right",
					prevEl: ".arrow-left",
				},
				// slidesPerView: 3,
				slidesPerView: "auto",
				centeredSlides: true,
				loopedSlides: 3,
				// spaceBetween: 25,
			},
		);

		var similarSwiper = new Swiper(
			document.querySelector("#similar"),
			{
				loop: true,
				navigation: {
					nextEl: ".arrow-right",
					prevEl: ".arrow-left",
				},
				// slidesPerView: 3,
				slidesPerView: "auto",
				centeredSlides: true,
				loopedSlides: 3,
				// spaceBetween: 25,
			},
		);

		var testimonialSwiper = new Swiper(
			document.querySelector("#testimonials"),
			{
				loop: true,
				navigation: {
					nextEl: ".arrow-right",
					prevEl: ".arrow-left",
				},
				// slidesPerView: 3,
				slidesPerView: "auto",
				centeredSlides: true,
				loopedSlides: 3,
				// spaceBetween: 25,
			},
		);

		var brandsSwiper = new Swiper(document.querySelector("#brands"), {
			loop: true,
			navigation: {
				nextEl: ".arrow-right",
				prevEl: ".arrow-left",
			},
			spaceBetween: 10,
			slidesPerView: "auto",
			loopedSlides: 5,
			centeredSlides: true,
		});

		initCollapsible();
	},
	false,
);

/**
 * @param {HTMLElement} popup Popup container
 * @param {Number} autoOpen Auto Open delay
 * @param {String} trigger Open popup trigger selector
 * @returns {{popup: HTMLElement, openPopup: Function, dismissPopup: Function}}
 */
function setUpPopup(popup, trigger = "", autoOpen = false) {
	if (autoOpen)
		setTimeout(() => {
			openPopup();
		}, parseInt(autoOpen));

	popup.querySelectorAll(".popup-dismiss").forEach((dismiss) => {
		dismiss.addEventListener("click", dismissPopup);
	});

	if (trigger) {
		document.querySelectorAll(trigger).forEach((triggerElement) => {
			triggerElement.addEventListener("click", openPopup);
		});
	}

	function dismissPopup() {
		popup.classList.add("popup-closing");
		setTimeout(() => {
			popup.classList.remove("popup-active", "popup-closing");
		}, 500);
	}

	function openPopup() {
		popup.classList.add("popup-active");
	}

	var popupWrapper = {
		popup,
		openPopup,
		dismissPopup,
	};

	return popupWrapper;
}

function initCollapsible() {
	document.querySelectorAll(".collapsible").forEach((collapsible) => {
		var collapseToggle = collapsible.querySelector(".collapse-toggle");
		var collapseBody = collapsible.querySelector(".collapse-body");
		var collapseContent = collapsible.querySelector(".collapse-content");
		var collapsed = collapsible.classList.contains("collapsed");
		collapseToggle.addEventListener("click", toggleCollapse);
		toggleCollapse();

		function toggleCollapse() {
			if (collapsed) {
				collapsible.classList.add("expanding");
				var collapseHeight = collapseContent.getBoundingClientRect().height;
				collapsible.classList.remove("collapsed");
				collapseBody.style.height = collapseHeight + "px";
				setTimeout(() => {
					collapsible.classList.remove("expanding");
					collapsed = !collapsed;
				}, 250);
			} else {
				collapsible.classList.add("collapsing", "collapsed");
				collapseBody.style.height = "0px";
				setTimeout(() => {
					collapsible.classList.remove("collapsing");
					collapsed = !collapsed;
				}, 250);
			}
		}
	});
}

window.addEventListener("orientationchange", checkOrientation);

function checkOrientation() {
	if (window.orientation == 0) {
		// Portrait
		document.documentElement.classList.remove("landscape");
	} // Landscape
	else {
		document.documentElement.classList.add("landscape");
	}
}

checkOrientation();
