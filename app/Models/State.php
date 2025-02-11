<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;
    public $table = "state_table";
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
