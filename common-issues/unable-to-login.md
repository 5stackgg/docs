# Unable to Login

If you are unable to log in, there are two common setup issues:

- You are using a deeply nested subdomain.
- Your reverse proxy is not forwarding to HTTPS.

## Deeply Nested Subdomain {#deeply-nested-subdomain}

If you are using a deeply nested subdomain (for example, `panel.subdomain.example.com`), you may need to adjust your cookie domain settings to ensure authentication works correctly. See [Cookie Domain](/install/cookie-domain) for more information.

## Proxy Not Forwarding to HTTPS {#proxy-not-forwarding-https}

If your reverse proxy is not forwarding requests to HTTPS, authentication may fail. Make sure your proxy is configured to forward requests to the backend using HTTPS. See [Reverse Proxy](/install/reverse-proxy) for setup instructions.
