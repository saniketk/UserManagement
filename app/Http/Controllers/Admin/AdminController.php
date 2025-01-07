<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(){
        $users = User::where('access_token','user')->with(['country', 'state', 'city'])->get();
        return view('admin/dashboard',['users'=>$users]);
    }
}
