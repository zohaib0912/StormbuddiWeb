# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
## Backend / API integration

If you plan to connect this UI to a PHP API, a lightweight environment-based
database helper is available at `server/db.php`. Configure the following
environment variables on your hosting platform (or in your PHP runtime) before
using the helper:

```
DB_HOST=your-db-host
DB_NAME=your-db-name
DB_USER=your-db-username
DB_PASS=your-db-password
DB_CHARSET=utf8mb4
```

Example usage in a PHP endpoint:

```php
require_once __DIR__ . '/../server/db.php';

if (!testConnection()) {
    http_response_code(500);
    exit('Database connection failed');
}

$pdo = getDBConnection();
$stmt = $pdo->query('SELECT NOW() as server_time');
echo json_encode($stmt->fetch());
```

### Pricing API + CORS

The pricing section (see `src/components/Pricing.js`) loads live plans from
`/api/pricing`. In local development, CRA proxies that path to
`https://app.stormbuddi.com/get_pricing_data.php` via `src/setupProxy.js` so you
won’t hit CORS errors. If you need a different backend, either:

1. Set `REACT_APP_PRICING_API` to the full URL (it must include CORS headers), or
2. Update `src/setupProxy.js` to point at your preferred target.

In production, host `get_pricing_data.php` alongside the built assets or set
`REACT_APP_PRICING_API` during the build step to whatever URL serves the JSON.


**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
