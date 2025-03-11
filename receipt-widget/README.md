# Receipt Widget Example

## System requirements

- node
- npm

## Instructions

Create `.env` file with following contents:

```plaintext
VITE_SITE_ID=your_site_id_from_IMP
VITE_PRIVATE_KEY=your_base64_encoded_private_key_from_IMP
VITE_SESSION_ID=checkout_session_id
```

Install dependencies:

```shell
npm install
```

To run development server:

```shell
npm run dev
```

Visit http://localhost:3001

## Notice

Call for token should be handled by backend in real world case - this prevents leaking private key.
On frontend side you should use only token for auth.
