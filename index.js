const activeTab = (e, i) => {
	let classTab = document.getElementsByClassName("img-cnt");
	for (let i = 0; i < classTab.length; i++) {
		classTab[i].classList.remove("tab-active");
	}

	e.classList.add("tab-active");

	if (i === 1) {
		document.getElementById("video").src = "./assets/videos/look1.mov";
		document.getElementById("contain1").style.display = "block";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
		document.getElementById("contain6").style.display = "none";
	}

	if (i === 2) {
		document.getElementById("video").src = "./assets/videos/look2.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "block";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
		document.getElementById("contain6").style.display = "none";
		document.getElementsByClassName("tab")[0].scrollTo({
			left: 0,
			behavior: "smooth",
		});
	}

	if (i === 3) {
		document.getElementById("video").src = "./assets/videos/look3.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "block";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
		document.getElementById("contain6").style.display = "none";

		document.getElementsByClassName("tab")[0].scrollTo({
			left: 50,
			behavior: "smooth",
		});
	}

	if (i === 4) {
		document.getElementById("video").src = "./assets/videos/look4.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "block";
		document.getElementById("contain5").style.display = "none";
		document.getElementById("contain6").style.display = "none";
		document.getElementsByClassName("tab")[0].scrollTo({
			left: 100,
			behavior: "smooth",
		});
	}

	if (i === 5) {
		document.getElementById("video").src = "./assets/videos/look5.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "block";
		document.getElementById("contain6").style.display = "none";
		document.getElementsByClassName("tab")[0].scrollTo({
			left: 200,
			behavior: "smooth",
		});
	}

	if (i === 6) {
		document.getElementById("video").src = "./assets/videos/look6.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
		document.getElementById("contain6").style.display = "block";
	}
};

const toggleup = (e) => {
	document.getElementById("contain1").classList.toggle("noneheight");
	document.getElementById("contain2").classList.toggle("noneheight");
	document.getElementById("contain3").classList.toggle("noneheight");
	document.getElementById("contain4").classList.toggle("noneheight");
	document.getElementById("contain5").classList.toggle("noneheight");
	document.getElementById("contain6").classList.toggle("noneheight");

	document.getElementById("arrow").classList.toggle("rotate");
	document.getElementById("test").classList.toggle("d-none");
};

const scrollDown = () => {
	let flag = true;
	let flag2 = false;

	if (document.getElementById("test").classList.toggle("up")) {
		console.log(1);
		document.getElementById("contain1").scrollTo({
			left: 0,
			top: document.getElementById("contain1").scrollHeight - 300,
			behavior: "smooth",
		});

		document.getElementById("contain2").scrollTo({
			left: 0,
			top: document.getElementById("contain2").scrollHeight - 300,
			behavior: "smooth",
		});

		document.getElementById("contain3").scrollTo({
			left: 0,
			top: document.getElementById("contain3").scrollHeight - 300,
			behavior: "smooth",
		});

		document.getElementById("contain4").scrollTo({
			left: 0,
			top: document.getElementById("contain4").scrollHeight - 300,
			behavior: "smooth",
		});

		document.getElementById("contain5").scrollTo({
			left: 0,
			top: document.getElementById("contain5").scrollHeight - 300,
			behavior: "smooth",
		});

		document.getElementById("contain6").scrollTo({
			left: 0,
			top: document.getElementById("contain6").scrollHeight - 300,
			behavior: "smooth",
		});

		flag = false;
		flag2 = true;
	} else if (!document.getElementById("test").classList.contains("up")) {
		console.log(2);
		document.getElementById("contain1").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});
		document.getElementById("contain2").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});
		document.getElementById("contain3").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});

		document.getElementById("contain4").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});

		document.getElementById("contain5").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});

		document.getElementById("contain6").scrollTo({
			left: 0,
			top: 0,
			behavior: "smooth",
		});

		flag2 = false;
		flag = true;
	}
};

let controller = new ScrollMagic.Controller();

let scene = new ScrollMagic.Scene({
	triggerElement: ".crative",
	triggerHook: 0.5,
})
	.setClassToggle(".summer", "leftzero")
	.addTo(controller);

let controller2 = new ScrollMagic.Controller();

let scene2 = new ScrollMagic.Scene({
	triggerElement: ".crative",
	triggerHook: 0.5,
})
	.setClassToggle(".mind", "rightzero")
	.addTo(controller2);

let controller3 = new ScrollMagic.Controller();

let scene3 = new ScrollMagic.Scene({
	triggerElement: ".crative",
	triggerHook: 0.5,
})
	.setClassToggle(".state", "leftzero")
	.addTo(controller3);

let controller4 = new ScrollMagic.Controller();

let scene4 = new ScrollMagic.Scene({
	triggerElement: ".crative",
	triggerHook: 0.5,
})
	.setClassToggle(".engage", "engage2")
	.addTo(controller3);

const removeframe = () => {
	document.getElementById("frame").style.top = "-500%";
};
