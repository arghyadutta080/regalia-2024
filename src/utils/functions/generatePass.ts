export const generatePass = async (name: string, phone:string, email:string, roll:string) => {
    try{
        const res = await fetch("/api/genPass", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              roll: roll,
              email: email,
              phone: phone,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
    
          const responseData = await res.json();
         return responseData;
    }
    catch(e){
        console.log(e)
    }
}