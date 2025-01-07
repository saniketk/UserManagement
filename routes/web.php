<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserManagementController;

Route::get('/', function () {
    return view('register'); 
});

Route::get('/login',[UserManagementController::class,'login'])->name('login');
Route::post('/signIn',[UserManagementController::class,'signIn'])->name('signIn');
Route::get('/register',[UserManagementController::class,'register'])->name('register');
Route::post('/register',[UserManagementController::class,'signUp']);
Route::get('/countries', [LocationController::class, 'getCountries']);
Route::get('/states/{countryId}', [LocationController::class, 'getStates']);
Route::get('/cities/{stateId}', [LocationController::class, 'getCities']);

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/dashboard',[AdminController::class,'dashboard'])->name('admin/dashboard');
    Route::get('/admin/logout',[AdminController::class,'logout'])->name('admin/logout');
});



