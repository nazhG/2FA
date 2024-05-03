# Two-Factor Authentication Example 

A simple example of Two-Factor Authentication (2FA) in a Node server.

## Overview 📝

This example is a single-page application that generates a QR code, scans it with a 2FA app,
for example, [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pli=1), and then verifies the code.

![2FA](https://raw.githubusercontent.com/nazhG/2FA/fbc1c7ce0b10c9b5bb1fc2d0b1f3ba92805d2f14/public/app.png)

it use the [speakeasy](https://www.npmjs.com/package/speakeasy) to generate the [TOTP](https://en.wikipedia.org/wiki/Time-based_one-time_password) codes.

if it helps you, please give a star ⭐️

## How to Run 🚀

1. Clone the repository:

```bash
git clone
```

2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:1729`.

## Contributing 🔧

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).