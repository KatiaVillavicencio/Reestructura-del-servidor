document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const first_nameInput = document.getElementById ('first_name');
    const last_nameInput = document.getElementById ('last_name');
    const emailInput = document.getElementById ('email');
    const ageInput = document.getElementById ('age');
    const passwordInput = document.getElementById ('password');
    const rolInput = document.getElementById ('rol');

    const first_name = first_nameInput.value;
    const last_name = last_nameInput.value;
    const email = emailInput.value;
    const age= ageInput.value;
    const password = passwordInput.value;
    const rol = rolInput.value;
    try{
        const response = await fetch ("/api/register",{
            method:"POST",
            body: JSON.stringify({first_name, last_name, email, age, password, rol}),
            headers: {
                "Content-Type": "application/json"

            }
        })

        if (response.ok) {
            const responseData= await response.json();
            const succesMessage= responseData.message;

            if (responseData.token) {
                window.location.hreft= '/';
            }
        } else{
            console.error ('Error al enviar mensaje. Estado:', response.status, 'texto', response.statusText);

        }


    } catch (error){
        console.error ('error de red:', error);
    }
    });