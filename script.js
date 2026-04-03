// ==========================================
// 1. Mobile Menu Toggle (3-Line Menu)
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

if (hamburger && navLinks) {
    // Hamburger ഐക്കണിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ മെനു വരാൻ
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // ഐക്കൺ മാറ്റാൻ (Bars to X)
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ലിങ്കിൽ ക്ലിക്ക് ചെയ്താൽ മെനു തനിയെ അടയാൻ
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ==========================================
// 2. Web3Forms Submission & Success Page
// ==========================================
const contactForm = document.getElementById('contactForm');
const result = document.getElementById('formResult');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if(submitBtn) submitBtn.disabled = true;
        if(result) {
            result.innerHTML = "Sending... Please wait.";
            result.style.color = "#ff9800";
        }

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                // സക്സസ് ആയാൽ നമ്മുടെ സ്വന്തം സക്സസ് പേജിലേക്ക് പോകും
                window.location.href = "success.html";
            } else {
                let json = await response.json();
                result.innerHTML = "Error: " + json.message;
                result.style.color = "#f44336";
                if(submitBtn) submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.log(error);
            if(result) result.innerHTML = "Something went wrong!";
            if(submitBtn) submitBtn.disabled = false;
        });
    });
}