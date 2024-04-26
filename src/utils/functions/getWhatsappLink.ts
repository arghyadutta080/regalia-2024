export function getWhatsAppLink(event: string): string | null {
    let link = "";
    switch (event) {
        case "Sargam":
            link = "https://chat.whatsapp.com/BfLSvagNLgv64VsBzhouCE";
            break;
        case "Carpe Diem":
            link = "https://chat.whatsapp.com/IdAJahLQzWs1jq4JYRfbIA";
            break;
        case "BAND BASH":
            link = "https://chat.whatsapp.com/DvUztkZPNbk0nWcq6KEXzI";
            break;
        case "Nrityam":
            link = "https://chat.whatsapp.com/CZGtHEsZ63u6V92rnTjNNj";
            break;
        case "Kashish-e-Haya":
            link = "https://chat.whatsapp.com/Jdt7q9yNtUq7gpL5I7c4OW";
            break;
        default:
            break;
    }
    return link;
}