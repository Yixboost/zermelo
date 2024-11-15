// pc bar
// Toggle sidebar functie
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  // Controleer de schermgrootte
  if (window.innerWidth > 768) {
    sidebar.classList.toggle("collapsed");
    if (sidebar.classList.contains("collapsed")) {
      mainContent.style.marginLeft = "80px"; // Sidebar gesloten
    } else {
      mainContent.style.marginLeft = "250px"; // Sidebar geopend
    }
  } else {
    // Voor kleine schermen verberg of toon de sidebar volledig
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block";
      mainContent.style.marginLeft = "250px";
    } else {
      sidebar.style.display = "none";
      mainContent.style.marginLeft = "0px";
    }
  }
}

// Bij het laden van de pagina
window.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  // Zorg dat de sidebar standaard gesloten is
  sidebar.classList.add("collapsed");
  mainContent.style.marginLeft = "80px";

  // Pas de sidebar aan op basis van de schermgrootte
  if (window.innerWidth <= 768) {
    sidebar.style.display = "none";
    mainContent.style.marginLeft = "0px";
  }
});

// Pas de sidebar aan bij het wijzigen van de schermgrootte
window.addEventListener("resize", function () {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  if (window.innerWidth <= 768) {
    sidebar.style.display = "none";
    mainContent.style.marginLeft = "0px";
  } else {
    sidebar.style.display = "";
    sidebar.classList.add("collapsed"); // Sidebar standaard gesloten
    mainContent.style.marginLeft = "80px";
  }
});



// phone bar
document.addEventListener("DOMContentLoaded", function () {
    const sideBarButton = document.getElementById("phone-bar-button");
    const sideBar = document.getElementById("phone-side-bar");

    sideBarButton.addEventListener("click", function () {
        const isSidebarVisible = sideBar.style.transform === "translateX(0px)";
        // Toggle de sidebar
        sideBar.style.transform = isSidebarVisible ? "translateX(-100%)" : "translateX(0)";
        // Verplaats de knop
        sideBarButton.style.left = isSidebarVisible ? "20px" : "270px";
    });
});



//    QR code  (niet in gebruik)
function checkQRCode() {
    const resultElement = document.getElementById("result").innerText;
    try {
      const qrData = JSON.parse(resultElement);
      if (qrData.institution) {
        localStorage.setItem("schoolName", qrData.institution);
        localStorage.setItem("authorizationCode", qrData.code);
        document.getElementById("authorizationCode").value = qrData.code;
        document.getElementById("schoolName").value = qrData.institution;
        document.getElementById("result").innerHTML = "";
        console.log("Data saved to localStorage: ", qrData);
      }
    } catch (e) {
      console.error("Invalid QR code format or error parsing JSON:", e);
    }
  }

  const observer = new MutationObserver(checkQRCode);
  //observer.observe(document.getElementById("result"), {
  //  childList: true
  //});   uncomment if using again LOL



// Functie om een cookie op te slaan
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Cookie verloopt na de opgegeven dagen
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Functie om een cookie te krijgen
  function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return "";
  }

  // Functie om het geselecteerde kleurthema in de cookie op te slaan en het CSS-bestand in te laden
  document.getElementById("color-select").addEventListener("change", function() {
    let selectedValue = this.value;  // Verkrijg de geselecteerde waarde
    setCookie("selectedTheme", selectedValue, 7);  // Sla het thema op in een cookie voor 7 dagen

    // Verander het CSS-bestand door de juiste te laden
    loadCSS(selectedValue);
  });

  // Functie om het juiste CSS-bestand te laden
  function loadCSS(theme) {
    let link = document.getElementById("theme-stylesheet");

    // Als het theme-stylesheet al bestaat, update de href, anders maak een nieuw link-element aan
    if (!link) {
      link = document.createElement("link");
      link.id = "theme-stylesheet";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = `assets/css/${theme}.css`;  // Laad het CSS-bestand op basis van de geselecteerde waarde
  }

  // Wanneer de pagina wordt geladen, kijk of er een thema is opgeslagen in de cookie
  window.onload = function() {
    let theme = getCookie("selectedTheme");
    if (theme) {
      document.getElementById("color-select").value = theme;  // Zet de waarde van de select op de opgeslagen waarde
      loadCSS(theme);  // Laad het bijbehorende CSS-bestand
    }
  }