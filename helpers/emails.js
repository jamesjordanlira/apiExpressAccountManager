import nodemailer from 'nodemailer';
//  agyuhcqmanoayjnu

export const emailRegistro = async (datos) => {
  const { name, apellidos, email, token } = datos;

  const transporter = nodemailer.createTransport({ 
    host: "smtp.gmail.com",
    port: 465, 
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: '2519260008jjordanc@gmail.com',
      pass: process.env.pass_email
    }
  });

  // Info del email:
  const info = await transporter.sendMail({
    from: '"Digital Account Manager Administrador de Cuentas" <2519260008jjordanc@gmail.com>',
    to: email,
    subject: 'DigitalAccountManager - Confirma tu Cuenta',
    text: 'Confirma tu Cuenta lo antes posible, Saludos.',
    html: `<p>Hola ${name} ${apellidos}, Comprueba tu cuenta en DigitalAccountManager</p>
        <p>Tu Cuenta está casí lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.frontend_uri}/confirmar/${token}">Comprobar cuenta</a>
        </p>
        <p>Si tú no creaste esta cuenta, puedes ignorar este Email</p>
        `,
  });
};

export const emailOlvidePassword = async (datos) =>{
  const { name, apellidos, email, token } = datos;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: '2519260008jjordanc@gmail.com',
      pass: process.env.pass_email
    }
  });

    // Info del email:
    const info = await transporter.sendMail({
      from: '"Digital Account Manager Administrador de Cuentas" <2519260008jjordanc@gmail.com>',
      to: email,
      subject: 'DigitalAccountManager - Reestablece tu Password',
      text: 'Reestablece tu Password lo antes posible.',
      html: `<p>Hola ${name} ${apellidos}, Has solicitado reestablecer tu password</p>
          <p>Sigue este enlace para generar un nuevo password,:
              <a href="${process.env.frontend_uri}/olvide-password/${token}">Reestablecer Password</a>
          </p>
          <p>Si tú no Solicitaste esta acción, puedes ignorar este Email</p>
          `,
    });

};