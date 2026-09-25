import emailjs from '@emailjs/browser'

// TODO: replace these with the values from your EmailJS account (emailjs.com)
// - SERVICE_ID: Email Services tab, after connecting ayubtv555@gmail.com as the service
// - TEMPLATE_ID: Email Templates tab, the template that uses {{to_email}}, {{cc_email}}, {{subject}}, {{message_body}}
// - PUBLIC_KEY: Account > General tab
const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'

// sends the contact-us message through EmailJS, from ayubtv555@gmail.com to ayub555@gmail.com, cc'ing the visitor
function sendContactEmail({ firstName, lastName, country, email, message }) {
    const messageBody =
`You have received a new message from the Contact Us page.

Name: ${firstName} ${lastName}
Country: ${country}
Email: ${email}

Message:
${message}

---
Hi ${firstName},

Thank you for reaching out to us. We have received your message and will get in touch with you soon.

Regards,
HDFC Bank Team`

    const templateParams = {
        to_email: 'ayub555@gmail.com',
        cc_email: email,
        subject: `New Contact Us Message from ${firstName} ${lastName}`,
        message_body: messageBody
    }

    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
}

export default { sendContactEmail }
