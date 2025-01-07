<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .sidebar {
            height: 100vh;
            position: fixed;
            top: 56px;
            left: 0;
            width: 250px;
            background-color: #11365a;
            padding-top: 20px;
        }

        .main-content {
            margin-left: 250px;
            margin-top: 56px;
        }

        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1030;
        }

        @media (max-width: 768px) {
            .sidebar {
                position: static;
                height: auto;
                width: 100%;
            }
            .main-content {
                margin-left: 0;
            }
        }

        .nav-link {
            font-size: 1.1rem;
            padding: 10px 20px;
            color: #fff;
        }

        .nav-link.active {
            background-color: #eaecee;
            color: #000;
            border-radius: 5px;
        }

        main {
            background: #f8f9fa;
            min-height: 100vh;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            font-weight: 700;
        }
        .navbar-dark{
            background: #11365a;
        }
    </style>
</head>