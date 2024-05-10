<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use ZipArchive;

class GalleryController extends Controller
{
    public function __invoke(Request $request)
    {
        $page = $request->query('page') ?? 1;
        $sort = $request->query('sort') ? explode(":", $request->query('sort')) : ['name', 'asc'];
        $perPage = $request->query('per-page') ?? 10;
        $data = Image::orderBy($sort[0], $sort[1])->paginate($perPage, ['*'], 'page', $page);
        return Inertia::render('Gallery', [
            'images' => $data->items(), 
            'page' => $data->currentPage(),
            'perPage' => $perPage,
            'sort' => $sort,
            'countpage' => $data->lastPage(),
        ]);
    }

    public function downloadImage(Request $request)
    {
        $request->validate([
            'image' => ['string'],
        ]);
        $image = "public/images/" . $request->image;
        $imagePath = Storage::path($image);

        $zipFileName = 'imageArchive.zip';
        $zip = new ZipArchive;
        if ($zip->open($zipFileName, ZipArchive::CREATE) === true) {
            try {
                $zip->addFile($imagePath, $request->image);
                $zip->close();
                return response()->download($zipFileName)->deleteFileAfterSend();
            } catch (\Throwable $th) {
                abort(500, 'Не удалось добавить файл в архив');
            }
        } else {
            abort(500, 'Не удалось создать zip-архив');
        }
    }
}
