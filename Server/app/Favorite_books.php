<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Favorite_books extends Model
{
    public static  function isFavorite($book_id) {
        
        $id = Auth::user()->id;
        
        $res = DB::table('favorite_books')
                    ->where('user_id', '=', $id)
                    ->where('book_id', '=', $book_id)
                    ->count();
        
        return $res;
    }
    
    public static function addFavorite($book_id) {
        
        $id = Auth::user()->id;
        
        $res = DB::table('favorite_books')->insert([
            'user_id' => $id,
            'book_id' => $book_id
        ]);
        
        return $res;
    }
    
    public static function removeFavorite($book_id) {
        
        $id = Auth::user()->id;
        
        $res = DB::table('favorite_books')
                    ->where('user_id', '=', $id)
                    ->where('book_id', '=', $book_id)
                    ->delete();
        
        return $res;
    }
}
