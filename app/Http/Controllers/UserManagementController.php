<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mail;


class UserManagementController extends Controller
{
    public function register(){
        return view('register');
    }
    public function login(){
        return view('login');
    }
    public function signUp(Request $request){
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'dob' => 'required|date',
            'gender' => 'required',
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
        ]);

        $newRegistration = new User();
        $newRegistration->full_name = $request->full_name;
        $newRegistration->email = $request->email;
        $newRegistration->password = md5($request->password);
        $newRegistration->dob = $request->dob;
        $newRegistration->gender = $request->gender;
        $newRegistration->country_id = $request->country;
        $newRegistration->state_id = $request->state;
        $newRegistration->city_id = $request->city;
        $newRegistration->access_token = 'user';
        $newRegistration->save();
        if($newRegistration){
            Mail::to($request->email)->send(new RegistrationMail($request->full_name, $request->email, $request['password']));
        }
        $request->session()->flash('success', 'Registration Completed Successfully');
        return back();
    }

    public function signIn(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email',$request->email)->where('access_token','admin')->first();
        if($user){
            if(md5($request->password, $user->password)){
                $request->session()->put('loginId',$user->id);
                return redirect('admin/dashboard');
            }
            else{
                $request->session()->flash('error', 'Invalid Password ');
                return back();
            }
        }
        else{
            $request->session()->flash('error', 'Invalid Email Id');
            return back();
        }
      
    }
}
