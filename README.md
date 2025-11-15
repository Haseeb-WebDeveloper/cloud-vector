This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

For email functionality (Brevo SMTP), you need to set up the following environment variables in your `.env.local` file:

```env
# Brevo SMTP Configuration
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your-brevo-smtp-username
BREVO_SMTP_PASSWORD=your-brevo-smtp-password

# Optional: Verified sender email (should be verified in Brevo)
BREVO_FROM_EMAIL=your-verified-email@example.com

# Admin email to receive newsletter subscriptions (defaults to web.dev.haseeb@gmail.com)
ADMIN_EMAIL=web.dev.haseeb@gmail.com
```

To get your Brevo SMTP credentials:
1. Sign up for a [Brevo account](https://www.brevo.com/)
2. Go to **SMTP & API** section in your Brevo dashboard
3. Create an SMTP key
4. Use the provided SMTP server, username, and password
5. **Important**: Verify your sender email address in Brevo (Settings > Senders)

### Troubleshooting Email Issues

If you're not receiving emails:

1. **Check your `.env.local file exists** in the project root
2. **Verify Brevo credentials** are correct:
   - `BREVO_SMTP_USER` should be your Brevo SMTP username (usually your account email)
   - `BREVO_SMTP_PASSWORD` should be your SMTP key (not your account password)
3. **Verify sender email** in Brevo dashboard (the "from" email must be verified)
4. **Check server logs** - The API route logs detailed error messages
5. **Restart your dev server** after adding/changing environment variables
6. **Check spam folder** - Emails might be filtered as spam initially

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
