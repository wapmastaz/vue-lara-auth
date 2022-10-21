<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    //
    public function register(RegisterRequest $request)
    {
        // get validated data
        $data = $request->all();
        $data['code'] = getTrx(5);
        $data['uid'] = uniqid();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        if ($user) {
            // send email

            // create token
            $token = $user->createToken($user->name);
            // send a response back
            $response = [
                'token' => $token->plainTextToken,
                'user' => $user,
            ];

            return response()->json($response);

        }
        return response()->json(['message' => 'server error'], 500);
    }
}