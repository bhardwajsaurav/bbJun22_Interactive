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
	}

	if (i === 2) {
		document.getElementById("video").src = "./assets/videos/look2.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "block";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
	}

	if (i === 3) {
		document.getElementById("video").src = "./assets/videos/look3.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "block";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "none";
	}

	if (i === 4) {
		document.getElementById("video").src = "./assets/videos/look4.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "block";
		document.getElementById("contain5").style.display = "none";
	}

	if (i === 5) {
		document.getElementById("video").src = "./assets/videos/look5.mov";
		document.getElementById("contain1").style.display = "none";
		document.getElementById("contain2").style.display = "none";
		document.getElementById("contain3").style.display = "none";
		document.getElementById("contain4").style.display = "none";
		document.getElementById("contain5").style.display = "block";
	}

	if (i === 6) {
		document.getElementById("video").src = "./assets/videos/look6.mov";
	}
};

const toggleup = (e) => {
	document.getElementById("contain1").classList.toggle("noneheight");
	document.getElementById("contain2").classList.toggle("noneheight");
	document.getElementById("contain3").classList.toggle("noneheight");
	document.getElementById("contain4").classList.toggle("noneheight");
	document.getElementById("contain5").classList.toggle("noneheight");

	document.getElementById("arrow").classList.toggle("rotate");
	document.getElementById("test").classList.toggle("d-none");
};

const scrollDown = () => {
	let flag = true;
	let flag2 = false;

	if (flag) {
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
	}

	if (flag2) {
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
