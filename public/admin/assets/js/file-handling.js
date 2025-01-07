function showModal(response, errorMessage, type) {
    if (response == '') {
        $('#success-modal').show();
        $('.success-message').text(errorMessage);
    } else {
        var responseObject = JSON.parse(response);
        // Check the errorCode
        if (responseObject.errorCode == "0000") {
            $('.modal').addClass('hide');
            $('.modal').css('display', 'none');
            $('body').append('<div class="modal-backdrop fade show"></div>');
            $('#success-modal').addClass('show');
            $('#success-modal').css('display', 'block');
            $('.success-message').text(responseObject.errorMessage);
            if (type == 'login') {
                $('.message').addClass('success-message text-success').text(responseObject.errorMessage);
                setTimeout(function() {
                    window.location.href = 'admin/dashboard.php';
                }, 2000);
            } else {
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }
        } else {
            $('.modal').modal('hide');
            $('#delete-modal').addClass('hide');
            $('body').append('<div class="modal-backdrop fade show"></div>');
            $('#delete-modal').css('display', 'none');
            $('.success-message').text(responseObject.errorMessage);
            $('#error-modal').addClass('show');
            $('#error-modal').css('display', 'block');
            $('.error-message').addClass('success-message text-danger').text(responseObject.errorMessage);
            setTimeout(function() {
                $('.modal-backdrop').remove();
                $('.modal').removeClass('show').addClass('hide');
                $('.modal').css('display', 'none');
                $('#error-modal').hide();
                $('.error-message').removeClass('success-message').text('');
                var thisEl = $('.submit');
                thisEl.text('Submit');
                thisEl.removeAttr('disabled');
                thisEl.css('pointer-events', 'auto');
                if (type == 'login') {
                    $('.message').addClass('success-message text-danger').text(responseObject.errorMessage);
                }

            }, 2000);

        }
    }
}

function sendDataToServer(url, dataObject, type, dataType, errorMessage) {
    var formData;
    if (dataType === 'post') {
        formData = new FormData($('.submit-data')[0]);

        // Encode form data using btoa
        var encodedData = new FormData();
        for (var [key, value] of formData.entries()) {
            if (value instanceof File) {
                // If the value is a file, do not encode it
                encodedData.append(key, value);
            } else {
                encodedData.append(key, btoa(value));
            }
        }
        formData = encodedData;
    } else {
        // Encode JSON object data
        var encodedObject = {};
        for (var key in dataObject) {
            if (dataObject.hasOwnProperty(key)) {
                encodedObject[key] = btoa(dataObject[key]);
            }
        }
        formData = JSON.stringify(encodedObject);
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        contentType: (dataType === 'post') ? false : 'application/json',
        processData: (dataType === 'post') ? false : true,
        success: function(response) {
            showModal(response, errorMessage, type);
        },
        error: function(error) {
            showModal(error, errorMessage, type);
        },
        complete: function() {
            if (type === 'documents') {
                $('#loader-container').hide();
            }
        }
    });
}

$('body').on('submit', 'form.delete-image-data', function(e) {
    // $('.delete-btn').on('click', function(e) {
    e.preventDefault();
    var type = 'delete';
    var url, dataObject;
    var call_api = true;

    dataType = 'json';
    url = '../../api/delete-data.php';
    dataObject = {
        id: $('input[name="deleteImageId"]').val(),
        mode: $('input[name = "deleteImageMode"]').val(),
        deleteType: $('input[name = "pageType"]').val()
    };

    $(this).find('input').each(function() {
        if ($(this).val() == '' && $(this).prop('required')) {
            call_api = false;

            return false;
        }
    });

    if (call_api) {
        var thisEl = $('.delete-btn');
        thisEl.text('Please wait...');
        thisEl.attr('disabled', 'true');
        thisEl.css('pointer-events', 'none');
        sendDataToServer(url, dataObject, type, dataType);
    }
    // else{
    //     showModal('', 'Please fill the required fields!', type);
    // }
});

$('body').on('submit', 'form.delete-data', function(e) {
    // $('.delete-btn').on('click', function(e) {
    e.preventDefault();
    var type = 'delete';
    var url, dataObject;
    var call_api = true;

    dataType = 'json';
    url = '../../api/delete-data.php';
    dataObject = {
        id: $('input[name="deleteId"]').val(),
        mode: $('input[name = "deleteMode"]').val(),
        deleteType: $('input[name = "pageType"]').val()
    };

    $(this).find('input').each(function() {
        if ($(this).val() == '' && $(this).prop('required')) {
            call_api = false;

            return false;
        }
    });

    if (call_api) {
        var thisEl = $('.delete-modal-btn');
        thisEl.text('Please wait...');
        thisEl.attr('disabled', 'true');
        thisEl.css('pointer-events', 'none');
        sendDataToServer(url, dataObject, type, dataType);
    }
});

$('body').on('submit', 'form.submit-warranty', function(e) {
    // $('.delete-btn').on('click', function(e) {
    e.preventDefault();
    var type = 'update-warranty';
    var url, dataObject;
    var call_api = true;

    dataType = 'json';
    url = '../../api/ajax.php';
    dataObject = {
        type: 'update-warranty',
        id: $('input[name="id"]').val(),
        months: $('select[name="months"]').val(),
        amount: $('input[name="amount"]').val(),
        payment_status: $('select[name="payment_status"]').val(),
        comment: $('textarea[name="comment"]').val(),

    };

    $(this).find('input').each(function() {
        if ($(this).val() == '' && $(this).prop('required')) {
            call_api = false;

            return false;
        }
    });

    if (call_api) {
        var thisEl = $('.delete-modal-btn');
        thisEl.text('Please wait...');
        thisEl.attr('disabled', 'true');
        thisEl.css('pointer-events', 'none');
        sendDataToServer(url, dataObject, type, dataType);
    }
});

$('body').on('submit', 'form.update-payment', function(e) {
    // $('.delete-btn').on('click', function(e) {
    e.preventDefault();
    var type = 'update-payment';
    var url, dataObject;
    var call_api = true;

    dataType = 'json';
    url = '../../api/ajax.php';
    dataObject = {
        type: 'update-payment',
        id: $('input[name="warrantyId"]').val(),
        paymentDate: $('input[name="paymentDate"]').val(),
    };

    $(this).find('input').each(function() {
        if ($(this).val() == '' && $(this).prop('required')) {
            call_api = false;

            return false;
        }
    });

    if (call_api) {
        var thisEl = $('.delete-modal-btn');
        thisEl.text('Please wait...');
        thisEl.attr('disabled', 'true');
        thisEl.css('pointer-events', 'none');
        sendDataToServer(url, dataObject, type, dataType);
    }
});


$('form.submit-data').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var type = form.find('input[name="type"]').val();
    var url, dataObject, dataType;
    var call_api = true;
    dataType = 'post';
    if (type == 'login') {
        url = '../api/ajax.php';
    } else {
        url = '../../api/ajax.php';
    }

    dataObject = {};
    $(this).find('input').each(function() {
        if ($(this).val() == '' && $(this).prop('required')) {
            call_api = false;

            return false;
        }
    });

    if (call_api) {
        var thisEl = $(this).closest('form').find('button[type="submit"]');
        thisEl.text('Please wait...');
        thisEl.attr('disabled', 'true');
        thisEl.css('pointer-events', 'none');
        sendDataToServer(url, dataObject, type, dataType);
    }
    // else{
    //     showModal('', 'Please fill the required fields!', type);
    // }
});


$(document).on('click', '.close', function() {
    $('.modal-popup').hide();
    // $('#delete-modal').modal('hide');
});

function getRelativePath(absoluteUrl) {
    var baseUrlToRemove = 'https://skinfotechies.in/demo/petazon';
    if (absoluteUrl.startsWith(baseUrlToRemove)) {
        return absoluteUrl.slice(baseUrlToRemove.length);
    } else {
        return absoluteUrl;
    }
}

function populateDeleteModal(id, text, pageName, deleteType) {
    var modalContent = document.getElementById('delete-modal-content');

    modalContent.innerHTML = '<form class="delete-data">' +
        '<input type="hidden" name="deleteId" value="' + id + '">' +
        '<input type="hidden" name="deleteMode" value="' + deleteType + '">' +
        '<input type="hidden" name="pageType" value="' + pageName + '">' +
        '<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></button>' +
        '<div class="text-center px-5 pb-0">' +
        '<svg class="custom-alert-icon svg-danger" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>' +
        '<h5>danger</h5>' +
        '<p class="">' + text + '</p>' +
        '<div>' +
        '<button class="delete-btn btn btn-sm btn-danger m-1 delete-modal-btn submit" type="submit">Delete</button>' +
        '<button type="button" class="btn close btn-sm btn-light" data-bs-dismiss="modal" aria-label="Close">Close</button>' +
        '</div>' +
        '</div>' +
        '</form>';
}


var window_url = window.location.pathname;
var window_url_array = window_url.split('/');
window_url_array.reverse();
var page_url = window_url_array[0];

if (page_url == 'user.php' || page_url == 'warranty-check.php' || page_url == 'store.php') {

    $(document).ready(function() {
        var type = btoa("fetch-city-list");

        function populateCityDropdown(stateId) {
            var cityId = $('input[name="cityId"]').val();
            $.ajax({
                type: 'POST',
                url: '../../api/ajax.php',
                data: JSON.stringify({ type: type, stateId: btoa(stateId) }),
                contentType: 'application/json',
                processData: true,
                success: function(response) {
                    var city = JSON.parse(response);
                    var cityList = city.dataList;
                    var cityOptions = "<option value='' selected disabled>Select City</option>";
                    for (var i = 0; i < cityList.length; i++) {
                        if (cityList[i].id == cityId) {
                            cityOptions += "<option value='" + cityList[i].id + "' selected>" + cityList[i].name + "</option>";
                        } else {
                            cityOptions += "<option value='" + cityList[i].id + "'>" + cityList[i].name + "</option>";
                        }
                    }
                    $('select[name="cityId"]').html(cityOptions);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        populateCityDropdown($('select[name="stateId"]').val());

        $('select[name="stateId"]').change(function() {
            var stateId = $(this).val();
            populateCityDropdown(stateId);
        });

        $('#amountInput').on('keyup', function() {
            var inputVal = $(this).val();

            // Remove commas from previous formatting
            inputVal = inputVal.replace(/,/g, '');

            // Split the number into integer and decimal parts
            var parts = inputVal.split('.');
            var integerPart = parts[0];
            var decimalPart = parts.length > 1 ? '.' + parts[1].substring(0, 2) : '';

            // Reverse the integer part and add commas
            var reversedInteger = integerPart.split('').reverse().join('');
            var formattedInteger = '';
            for (var i = 0; i < reversedInteger.length; i++) {
                if (i == 3 || (i > 3 && (i - 1) % 2 == 0)) {
                    formattedInteger += ',';
                }
                formattedInteger += reversedInteger[i];
            }
            formattedInteger = formattedInteger.split('').reverse().join('');

            // Combine the integer part with the decimal part
            var finalResult = formattedInteger + decimalPart;

            // Set the formatted value back to the input field
            $(this).val(finalResult);
        });

        $('select[name="userType"]').change(function() {
            var userType = $(this).val();
            if (userType == 'customer') {
                $('.address').show();

            } else {
                $('.address').hide();
            }
        });
    });
}


if (page_url == 'manage-products.php') {

    $(document).ready(function() {

        function populateUserDropdown(userType) {
            var type = btoa("fetch-user-list");
            $.ajax({
                type: 'POST',
                url: '../../api/ajax.php',
                data: JSON.stringify({ type: type, userType: btoa(userType) }),
                contentType: 'application/json',
                processData: true,
                success: function(response) {
                    var user = JSON.parse(response);
                    var userList = user.dataList;
                    var userOptions = "<option value='' selected disabled>Select User</option>";
                    for (var i = 0; i < userList.length; i++) {
                        userOptions += "<option value='" + userList[i].id + "'>" + userList[i].name + "</option>";
                    }
                    $('select[name="userId"]').html(userOptions);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        $('select[name="userType"]').change(function() {
            var userType = $(this).val();
            $('.userAddress').hide();
            populateUserDropdown(userType);
        });


        function populateCategoryDropdown(categoryId) {
            var type = btoa("fetch-sub-category-list");
            $.ajax({
                type: 'POST',
                url: '../../api/ajax.php',
                data: JSON.stringify({ type: type, categoryId: btoa(categoryId) }),
                contentType: 'application/json',
                processData: true,
                success: function(response) {
                    var user = JSON.parse(response);
                    var userList = user.dataList;
                    var userOptions = "<option value='' selected disabled>Select Sub Category</option>";
                    for (var i = 0; i < userList.length; i++) {
                        userOptions += "<option value='" + userList[i].id + "'>" + userList[i].name + "</option>";
                    }
                    $('select[name="subCategoryId"]').html(userOptions);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        $('select[name="categoryId"]').change(function() {
            var categoryId = $(this).val();
            populateCategoryDropdown(categoryId);
        });




        function populateAddressDropdown(userId) {
            var type = btoa("fetch-address");
            $.ajax({
                type: 'POST',
                url: '../../api/ajax.php',
                data: JSON.stringify({ type: type, userId: btoa(userId) }),
                contentType: 'application/json',
                processData: true,
                success: function(response) {
                    var address = JSON.parse(response);
                    var addressList = address.dataList;
                    $('.userAddress').show();
                    $('.address').val(addressList[0].address);
                    $('.user_id').val(addressList[0].user_id);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        $('select[name="userId"]').change(function() {
            var userId = $(this).val();

            populateAddressDropdown(userId);
        });
    });
}

if (page_url == 'warranty-check.php') {

    $(document).ready(function() {
        $('#checkBtn').click(function() {
            var productId = $('#productId').val().trim();

            if (productId) {
                var url = $(this).val();
                window.location.href = "warranty-check.php?productId=" + btoa(productId);
            } else {
                $('.errorMessage').show();
                $('.errorMessage').text('Please Enter Product Id');
            }
        });
    });
}
if (page_url == 'dispatch-report.php' || page_url == 'installation-report.php' || page_url == 'payment-report.php') {

    $(document).ready(function() {
        $('#toDate').on('change', function() {
            const fromDate = new Date($('#fromDate').val());
            const toDate = new Date($(this).val());

            if (fromDate > toDate) {
                $('.errorMessage')
                    .text('From Date should not be greater than To Date')
                    .show();
                $(this).val('');
            } else {
                $('.errorMessage').hide();
            }
        });
    });
}