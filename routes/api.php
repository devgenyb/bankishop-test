<?php

use App\Http\Controllers\Api\v1\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::group(['prefix' => '/image'], function() {
    Route::get('/', [ImageController::class, 'index']);
    Route::get('/{id}', [ImageController::class, 'get']);    
});
