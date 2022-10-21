<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/* ===================PUBLIC ROUTES ===================*/
Route::prefix('v1')->group(function () {
    // test route
    Route::get('/', [LoginController::class, 'index']);
    Route::post('/register', [RegisterController::class, 'register']);
    // Login Route
    Route::middleware('auth:santum')->get('/user', function (Request $request) {
        return $request->user();
    });
});