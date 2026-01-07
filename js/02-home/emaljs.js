document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm("TA_SERVICE_ID", "TA_TEMPLATE_ID", this)
    .then(() => {
        showToast("Votre message a été envoyé avec succès 🎉", "success");
        this.reset();
    }, (error) => {
        showToast("Erreur lors de l'envoi. Veuillez réessayer ❌", "error");
        console.error(error);
    });
});

