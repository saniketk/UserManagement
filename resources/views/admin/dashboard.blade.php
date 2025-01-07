@extends('admin.include.master')
@section('content')
    <div class="row">
        <div class="card p-4">
        <h4>Registered Users</h4>
            <hr>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th> #</th>
                        <th> Full Name</th>
                        <th> Email</th>
                        <th> Date of Birth</th>
                        <th> Gender</th>
                        <th> Country</th>
                        <th> State</th>
                        <th> City</th>
                    </tr>
                </thead>
                <tbody>
                    @php $srno = 0; @endphp
                    @foreach ($users as $user)
                        @php $srno++; @endphp
                        <tr>
                            <td> {{$srno}} </td>    
                            <td> {{$user['full_name']}} </td>    
                            <td> {{$user['email']}} </td>    
                            <td> {{ \Carbon\Carbon::parse($user->dob)->format('d M Y') }} </td>    
                            <td> {{$user['gender']}} </td>    
                            <td>{{ $user->country ? $user->country->country_name : 'N/A' }} </td>    
                            <td>{{ $user->state ? $user->state->state_name : 'N/A' }} </td>    
                            <td>{{ $user->city ? $user->city->city_name : 'N/A' }} </td>    
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
