<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';

    protected $hidden = ['updated_at'];


    protected function path(): Attribute
    {
        return Attribute::make(
            get: fn () => Storage::url('/images/' . $this->name),
        );
    }
}
