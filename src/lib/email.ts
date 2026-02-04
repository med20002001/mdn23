import { Resend } from "resend";
type ContactEmailData = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_ADMIN: string;
};
export async function sendContactEmails({
  nom,
  email,
  sujet,
  message,
  RESEND_API_KEY,
  EMAIL_FROM,
  EMAIL_ADMIN,
}: ContactEmailData) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquante");
  }
  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_ADMIN],
    replyTo: email,
    subject: `[MDN23] Nouveau message : ${sujet}`,
    html: `
  <div style="font-family:'Courier New', Courier, monospace; background-color:#f4f1ea; padding:40px 20px;">
  <div style="max-width:580px; margin:0 auto; background:#fffef8; padding:45px 40px; position:relative; border:1px solid #e0dcd0;">
    <div style="position:absolute; top:20px; right:20px; width:65px; height:80px; border:2px dashed #c41e3a; opacity:0.7; text-align:center;">
      <div style="font-size:10px; color:#c41e3a; font-weight:bold; line-height:1.2; padding-top:10px;">
        REÇU<br>
        <span style="font-size:22px;">✉</span><br>
        ${new Date().getFullYear()}
      </div>
    </div>
    <div style="margin-bottom:35px; padding-bottom:20px; border-bottom:3px double #2c2c2c;">
      <div style="font-size:11px; color:#666; text-transform:uppercase; letter-spacing:3px;">
        Bureau de correspondance
      </div>
      <div style="font-family:'Times New Roman', Times, serif; font-size:32px; font-weight:bold; color:#1a1a1a;">
        NOUVEAU MESSAGE
      </div>
      <div style="font-size:12px; color:#888; font-style:italic; margin-top:6px;">
        Réf. ${Date.now().toString().slice(-6)} — MDN23
      </div>
    </div>
    <div style="margin-bottom:30px; padding:18px; background:#f9f7f2; border-left:4px solid #2c2c2c;">
      <div style="font-size:13px; color:#555; text-transform:uppercase; margin-bottom:6px;">
        Expéditeur
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
        <tr>
          <td style="padding:6px 0; font-weight:bold; width:90px;">Nom :</td>
          <td style="padding:6px 0;">${nom}</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-weight:bold;">Email :</td>
          <td style="padding:6px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-weight:bold;">Sujet :</td>
          <td style="padding:6px 0;">
            <span style="background:#fff3cd; padding:2px 6px; border:1px solid #ffeaa7;">
              ${sujet}
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div style="font-size:15px; color:#333; line-height:1.8;">
      <p style="font-weight:bold; margin-bottom:8px; text-transform:uppercase; font-size:13px;">
        Message
      </p>
      <div style="background:#ffffff; border:1px solid #e0dcd0; padding:15px; white-space:pre-line;">
        ${message}
      </div>
    </div>
    <div style="margin-top:40px; display:flex; justify-content:space-between; align-items:flex-end;">
      <div style="text-align:center;">
        <div style="width:80px; height:80px; border:3px solid #c41e3a; border-radius:50%; font-size:11px; color:#c41e3a; font-weight:bold; line-height:1.2; padding-top:18px;">
          REÇU<br>LE<br>${new Date().toLocaleDateString("fr-FR")}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Times New Roman', Times, serif; font-size:24px; color:#2c5291; font-weight:bold; letter-spacing:2px;">
          MDN23
        </div>
        <div style="font-size:11px; color:#999;"> Notification interne </div>  </div>
    </div>
    <div style="margin-top:40px; padding-top:15px; border-top:1px solid #d0ccc0; font-size:10px; color:#999; text-align:center;">
      Message reçu via le formulaire de contact.<br/>
      Merci de traiter cette demande dans les meilleurs délais.
    </div>
  </div>
</div>
`,
  });

  await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    subject: "Confirmation – MDN23",
   html: `
<div style="font-family:'Courier New', Courier, monospace; background-color:#f4f1ea; padding:40px 20px;">

  <div style="max-width:580px; margin:0 auto; background:#fffef8; padding:45px 40px; position:relative; border:1px solid #e0dcd0;">
    <div style="position:absolute; top:20px; right:20px; width:65px; height:80px; border:2px dashed #c41e3a; opacity:0.7; text-align:center;">
      <div style="font-size:10px; color:#c41e3a; font-weight:bold; line-height:1.2; padding-top:10px;">
        ENVOYÉ<br>
        <span style="font-size:22px;">✉</span><br>
        2026
      </div>
    </div>
    <div style="margin-bottom:35px; padding-bottom:20px; border-bottom:3px double #2c2c2c;">
      <div style="font-size:11px; color:#666; text-transform:uppercase; letter-spacing:3px;">
        Bureau de correspondance
      </div>
      <div style="font-family:'Times New Roman', Times, serif; font-size:34px; font-weight:bold; color:#1a1a1a;">
        ACCUSÉ DE RÉCEPTION
      </div>
      <div style="font-size:12px; color:#888; font-style:italic; margin-top:6px;">
        Réf. ${Date.now().toString().slice(-6)} — MDN23
      </div>
    </div>
    <div style="margin-bottom:30px; padding:18px; background:#f9f7f2; border-left:4px solid #2c2c2c;">
      <div style="font-size:13px; color:#555; text-transform:uppercase;">
        À l'attention de
      </div>
      <div style="font-size:18px; font-weight:bold; color:#1a1a1a;">
        ${nom}
      </div>
      <div style="font-size:14px; color:#666; margin-top:6px;">
        Objet :
        <span style="background:#fff3cd; padding:2px 6px; border:1px solid #ffeaa7;">
          ${sujet}
        </span>
      </div>
    </div>
    <div style="font-size:15px; color:#333; line-height:1.85;">
      <p style="text-indent:25px; margin-bottom:18px;">Madame, Monsieur, </p>
      <p style="text-indent:25px; margin-bottom:18px;"> Nous accusons réception de votre correspondance. Votre demande a été enregistrée et transmise à notre service compétent.</p>
      <p style="text-indent:25px;">
        Une réponse personnalisée vous parviendra dans un délai de quarante-huit heures ouvrées.</p>
    </div>
    <div style="margin-top:40px; display:flex; justify-content:space-between; align-items:flex-end;">
      <div style="text-align:center;">
        <div style="width:80px; height:80px; border:3px solid #c41e3a; border-radius:50%; font-size:11px; color:#c41e3a; font-weight:bold; line-height:1.2; padding-top:18px;">
          REÇU<br>LE<br>${new Date().toLocaleDateString("fr-FR")}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Times New Roman', Times, serif; font-size:26px; color:#2c5291; font-weight:bold; letter-spacing:2px;">
          MDN23
        </div>
        <div style="font-size:11px; color:#999;">
          Service clientèle
        </div>
      </div>
    </div>
    <div style="margin-top:40px; padding-top:15px; border-top:1px solid #d0ccc0; font-size:10px; color:#999; text-align:center;">
      Document généré automatiquement.<br/>
      Merci de conserver cette référence.
    </div>
  </div>
</div>`});
}