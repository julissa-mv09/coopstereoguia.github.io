
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import {getFirestore,collection,addDoc,query,getDocs} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBE4WV-vxGTDqxOI3ckujzBJ-5rK3E3iNE",
    authDomain: "bdtics-7a92e.firebaseapp.com",
    projectId: "bdtics-7a92e",
    storageBucket: "bdtics-7a92e.appspot.com",
    messagingSenderId: "187744087098",
    appId: "1:187744087098:web:793a8131b1ea62c3699903"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db =getFirestore(app);

  let botonenviar=document.getElementById("Btnenviar");
  let btnconsulta=document.getElementById("btnConsulta");
 const list=document.querySelector("ul");

  botonenviar.addEventListener("click",guardar);
  btnconsulta.addEventListener("click",Consultar);





  async function guardar() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let asunto = document.getElementById("asunto").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || correo === "" || asunto === "" || mensaje === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "sugerencias"), {
            nombre: nombre,
            correo: correo,
            asunto: asunto,
            mensaje: mensaje
        });

        alert("Tu sugerencia ha sido receptada, gracias por tu mensaje");
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("asunto").value = "";
        document.getElementById("mensaje").value = "";
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error al enviar la sugerencia, por favor inténtalo de nuevo más tarde.");
    }
}
  
  async function Consultar()
  {
    const consulta=query(collection(db,"sugerencias"));
    const query_consulta=await getDocs(consulta);

    query_consulta.forEach((doc)=>
    {
        console.log(doc.id, " =>", doc.data());
        console.log(doc.data().nombre);
        console.log(doc.data().correo);
        console.log(doc.data().asunto);
        console.log(doc.data().mensaje);

        let html =`
            <div>${doc.data().nombre} </div>
            <div>${doc.data().correo} </div>
            <div>${doc.data().asunto} </div>
            <div>${doc.data().mensaje} </div>
        
        `;
         list.innerHTML +=html;

     });
  }


