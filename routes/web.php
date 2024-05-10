<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;



Route::group(['prefix' => '/image-form'], function() {
    Route::get('/', [ImageController::class, 'imageForm']);
    Route::post('/', [ImageController::class, 'saveFiles']);    
});


Route::get('/', GalleryController::class)->name('gallery');

Route::get('/images/{imageName}', ImageController::class)->name('image.show');
Route::get('/download-image', [GalleryController::class, 'downloadImage']);