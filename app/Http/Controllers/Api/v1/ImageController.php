<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        return response()->json(Image::all());
    }

    public function get($id)
    {
        return response()->json(Image::findOrFail($id));
    }
}
