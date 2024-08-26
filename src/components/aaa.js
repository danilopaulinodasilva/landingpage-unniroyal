document.addEventListener("DOMContentLoaded", function () {
  const formFooter = document.getElementById("formFooter");
  const btnFooter = document.querySelector("#submitFooter");
  const errorsFooter = {
    nameFooter: "",
    companyFooter: "",
    emailFooter: "",
    telefoneFooter: "",
    messageFooter: "",
  };

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateFieldFooter(input, errorKey, errorMessage) {
    const value = input.value.trim();

    if (errorKey === "telefoneFooter") {
      const digits = value.replace(/\D/g, "");
      if (
        digits.length < 10 ||
        (digits.length > 11 && value.length === digits.length)
      ) {
        errorsFooter[errorKey] =
          "O número de telefone deve ter 10 ou 11 dígitos.";
      } else {
        errorsFooter[errorKey] = "";
      }
    } else if (
      value.length < 1 ||
      (errorKey === "emailFooter" && !isValidEmail(value))
    ) {
      errorsFooter[errorKey] = errorMessage;
    } else {
      errorsFooter[errorKey] = "";
    }
  }

  function updateUIFooter() {
    document.querySelector("#nameFooter + p")?.remove();
    document.querySelector("#companyFooter + p")?.remove();
    document.querySelector("#emailFooter + p")?.remove();
    document.querySelector("#telefoneFooter + p")?.remove();
    document.querySelector("#messageFooter + p")?.remove();

    const fieldsFooter = [
      "nameFooter",
      "companyFooter",
      "emailFooter",
      "telefoneFooter",
      "messageFooter",
    ];
    fieldsFooter.forEach((id) => {
      const input = document.getElementById(id);
      input.style.border = "1px solid #dee2e6";
      if (errorsFooter[id]) {
        const errorElem = document.createElement("p");
        errorElem.classList.add("error");
        errorElem.textContent = errorsFooter[id];
        input.style.borderColor = "red";
        input.style.borderWidth = "2px";
        input.style.borderStyle = "solid";
        input.parentElement.appendChild(errorElem);
      }
    });
  }

  function handleBlurFooter(event) {
    const { id } = event.target;
    const errorMessagesFooter = {
      nameFooter: "Por favor, insira um nome completo.",
      companyFooter: "Por favor, insira o nome da empresa.",
      emailFooter: "O email fornecido não é válido.",
      telefoneFooter: "O número de telefone deve ter exatamente 11 dígitos.",
      messageFooter: "Por favor, insira uma mensagem.",
    };
    validateFieldFooter(event.target, id, errorMessagesFooter[id]);
    updateUIFooter();
  }

  function handleInputFooter(event) {
    const { id } = event.target;
    const errorMessagesFooter = {
      nameFooter: "Por favor, insira um nome completo.",
      companyFooter: "Por favor, insira o nome da empresa.",
      emailFooter: "O email fornecido não é válido.",
      telefoneFooter: "O número de telefone deve ter exatamente 11 dígitos.",
      messageFooter: "Por favor, insira uma mensagem.",
    };
    validateFieldFooter(event.target, id, errorMessagesFooter[id]);
    updateUIFooter();
  }

  function formatPhoneNumberFooter(phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7,
        11
      )}`;
    }
  }

  function handlePhoneInputFooter(event) {
    const input = event.target;
    input.value = formatPhoneNumberFooter(input.value);
  }

  btnFooter.addEventListener("click", function (e) {
    e.preventDefault();

    errorsFooter.nameFooter = "";
    errorsFooter.companyFooter = "";
    errorsFooter.emailFooter = "";
    errorsFooter.telefoneFooter = "";
    errorsFooter.messageFooter = "";

    const fieldsFooter = [
      "nameFooter",
      "companyFooter",
      "emailFooter",
      "telefoneFooter",
      "messageFooter",
    ];
    fieldsFooter.forEach((id) => {
      validateFieldFooter(
        document.getElementById(id),
        id,
        {
          nameFooter: "Por favor, insira um nome completo.",
          companyFooter: "Por favor, insira o nome da empresa.",
          emailFooter: "O email fornecido não é válido.",
          telefoneFooter:
            "O número de telefone deve ter exatamente 11 dígitos.",
          messageFooter: "Por favor, insira uma mensagem.",
        }[id]
      );
    });

    if (
      errorsFooter.nameFooter ||
      errorsFooter.companyFooter ||
      errorsFooter.emailFooter ||
      errorsFooter.telefoneFooter ||
      errorsFooter.messageFooter
    ) {
      updateUIFooter();
    } else {
      // Limpar campos e estilos
      document.getElementById("nameFooter").value = "";
      document.getElementById("companyFooter").value = "";
      document.getElementById("emailFooter").value = "";
      document.getElementById("telefoneFooter").value = "";
      document.getElementById("messageFooter").value = "";

      document.getElementById("nameFooter").style.border = "1px solid #dee2e6";
      document.getElementById("companyFooter").style.border =
        "1px solid #dee2e6";
      document.getElementById("emailFooter").style.border = "1px solid #dee2e6";
      document.getElementById("telefoneFooter").style.border =
        "1px solid #dee2e6";
      document.getElementById("messageFooter").style.border =
        "1px solid #dee2e6";

      // Preparar dados para envio
      const formData = new FormData();
      fieldsFooter.forEach((field) => {
        formData.append(field, document.getElementById(field).value);
      });

      const htmlContent = formatFormDataToHTML(formData);

      const jsonData = {
        service: "yourServiceName",
        to: "recipient@example.com",
        from: "sender@example.com",
        replyTo: document.getElementById("emailFooter").value,
        subject: "Form Submission",
        successPage: "/thank-you",
        html: htmlContent,
      };

      // Enviar dados para a API
      sendFormDataToAPI(jsonData);
    }
  });

  function formatFormDataToHTML(formData) {
    let htmlContent = "";

    for (const [key, value] of formData.entries()) {
      const label = document.querySelector(`label[for="${key}"]`);
      const inputElement = document.querySelector(`[name="${key}"]`);
      const labelText = label
        ? label.textContent.trim()
        : inputElement
        ? inputElement.placeholder || key
        : key;

      htmlContent += `<p><strong>${labelText}:</strong> ${value}</p>`;
    }

    return htmlContent;
  }

  async function sendFormDataToAPI(jsonData) {
    console.log("Sending data:", jsonData);

    try {
      const response = await fetch(
        `http://localhost:9998/save/google/sheets/contato`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("API response:", responseData);
        // window.location.href = jsonData.successPage;
      } else {
        console.error("Error sending data to the API:", responseData.message);
        alert("An error occurred, please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred, please try again.");
    }
  }

  if (formFooter) {
    formFooter.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  document
    .getElementById("nameFooter")
    .addEventListener("blur", handleBlurFooter);
  document
    .getElementById("nameFooter")
    .addEventListener("input", handleInputFooter);

  document
    .getElementById("companyFooter")
    .addEventListener("blur", handleBlurFooter);
  document
    .getElementById("companyFooter")
    .addEventListener("input", handleInputFooter);

  document
    .getElementById("emailFooter")
    .addEventListener("blur", handleBlurFooter);
  document
    .getElementById("emailFooter")
    .addEventListener("input", handleInputFooter);

  const telefoneInputFooter = document.getElementById("telefoneFooter");
  telefoneInputFooter.addEventListener("blur", handleBlurFooter);
  telefoneInputFooter.addEventListener("input", handleInputFooter);
  telefoneInputFooter.addEventListener("input", handlePhoneInputFooter);

  document
    .getElementById("messageFooter")
    .addEventListener("blur", handleBlurFooter);
  document
    .getElementById("messageFooter")
    .addEventListener("input", handleInputFooter);
});
