<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Our Platform</title>
</head>
<body>
    <h1>Welcome, {{ $username }}!</h1>
    <p>Thank you for registering on our platform. Here are your login credentials:</p>
    <ul>
        <li><strong>Username:</strong> {{ $email }}</li>
        <li><strong>Password:</strong> {{ $password }}</li>
    </ul>
    <p>We recommend changing your password after logging in for the first time.</p>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Enjoy your journey with us!</p>
</body>
</html>
