<?php

namespace App\Http\Controllers;

use App\Http\Services\ImageFormService;
use App\Http\Requests\image\SaveFileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    protected $service;

    public function __construct()
    {
        $this->service = new ImageFormService;
    }

    public function __invoke($imageName)
    {
        $path = storage_path("app/public/images/{$imageName}");

        
        if (!Storage::exists("public/images/{$imageName}")) {
            abort(404);
        }
        return response()->file($path);
    }

    public function imageForm()
    {
        return Inertia('ImageForm');
    }

    public function saveFiles(SaveFileRequest $request)
    {
        $data = $request->validated();
        $files = $data['files'];
        $this->service->saveImages($files);
        return to_route('gallery');
    }
}
