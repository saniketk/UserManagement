<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white text-center">
                        <h4 id="form-title">Registration Form</h4>
                    </div>
                    <div class="card-body">

                        <!-- Registration Form -->
                        <div id="registration-form">
                            @if (Session::has('success'))
                                <div class="alert alert-success">
                                    {{ session('success') }}
                                </div>
                            @endif
                            <form action="/register" method="POST">
                                <div class="row">
                                    @csrf
                                    <div class="mb-3 col-md-6">
                                        <label for="full_name" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="full_name" name="full_name" placeholder="Enter your full name" required>
                                        @if ($errors->has('full_name'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('full_name') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Email Address</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email address" required>
                                        @if ($errors->has('email'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('email') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
                                        
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="password_confirmation" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="Confirm your password" required>
                                        @if ($errors->has('password'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('password') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="dob" class="form-label">Date of Birth</label>
                                        <input type="date" class="form-control" id="dob" name="dob" required>
                                        @if ($errors->has('dob'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('dob') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="gender" class="form-label">Gender</label>
                                        <select class="form-select" id="gender" name="gender" required>
                                            <option value="" selected>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        @if ($errors->has('gender'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('gender') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="country" class="form-label">Country</label>
                                        <select class="form-select" id="country" name="country" required>
                                            <option value="" selected>Select Country</option>
                                        </select>
                                        @if ($errors->has('country'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('country') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="state" class="form-label">State</label>
                                        <select class="form-select" id="state" name="state" required>
                                            <option value="" selected>Select State</option>
                                        </select>
                                        @if ($errors->has('state'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('state') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="city" class="form-label">City</label>
                                        <select class="form-select" id="city" name="city" required>
                                            <option value="" selected>Select City</option>
                                        </select>
                                        @if ($errors->has('city'))
                                            <div class="text-danger">
                                                <small>{{ $errors->first('city') }}</small>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary ">Register </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- JavaScript for Dynamic Dropdowns -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            // Fetch countries
            $.get('/countries', function (data) {
                $.each(data, function (index, country) {
                    $('#country').append(`<option value="${country.id}">${country.country_name}</option>`);
                });
            });

            // Fetch states when a country is selected
            $('#country').on('change', function () {
                const countryId = $(this).val();
                $('#city').empty().append('<option value="">Select City</option>');

                if (countryId) {
                    $.get(`/states/${countryId}`, function (data) {
                        $.each(data, function (index, state) {
                            $('#state').append(`<option value="${state.id}">${state.state_name}</option>`);
                        });
                    });
                }
            });

            // Fetch cities when a state is selected
            $('#state').on('change', function () {
                const stateId = $(this).val();
                if (stateId) {
                    $.get(`/cities/${stateId}`, function (data) {
                        $.each(data, function (index, city) {
                            $('#city').append(`<option value="${city.id}">${city.city_name}</option>`);
                        });
                    });
                }
            });
        });

    </script>
</body>
</html>
