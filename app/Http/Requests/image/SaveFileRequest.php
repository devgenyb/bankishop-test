<?php

namespace App\Http\Requests\image;

use Illuminate\Foundation\Http\FormRequest;

class SaveFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'files.*' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'files' => 'array|min:1|max:5',
        ];
    }

    public function messages()
    {
        return [
            'files.*.mimes' => 'Файлы имееют недопустимый формат',
            'files' => 'Файлов может быть не менее 1 и не более 5',
        ];
    }
}
