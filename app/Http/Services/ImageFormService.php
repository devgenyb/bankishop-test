<?php

namespace App\Http\Services;

use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ImageFormService {

    public const DIR = 'public/images/';
    
    public function saveImages(array $images): void
    {   
        foreach ($images as $image) {
            $this->saveImage($image);
        }
    }

    private function renameIfExist($filename)
    {
        $pattern = '/^(.*?)(?:\((\d+)\))?(\.[^.]+)$/';

        $callback = function($matches) {
            $name = $matches[1];
            $number = isset($matches[2]) ? intval($matches[2]) + 1 : 1;
            $extension = $matches[3];
            $name = preg_replace('/(\(\d+\))?\.png$/', '', $name);
            return $name . '(' . $number . ')' . $extension;
        };

        while(Storage::exists(self::DIR . $filename)) {
            $filename = preg_replace_callback($pattern, $callback, $filename);
        }
        return $filename;
    }

    private function saveImage($image) {
        $name = $image->getClientOriginalName();
        $name = transliterator_transliterate('Any-Latin; Latin-ASCII;', $name);
        $fullname = $this->renameIfExist($name);
        if ($image->storeAs(self::DIR, $fullname)) {
            $model = new Image();
            $model->name = $fullname;
            $model->save();
        }

    }
}