<?php

namespace App\Http\Controllers\APIControllers;

use App\Favorite_books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Favorite_booksController extends Controller
{
    
    
    function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function favorites(Request $request) {
        $book_id = $request['book_id'];
        
        if($book_id != null) {
            if(Favorite_books::isFavorite($book_id) == 1) {
                Favorite_books::removeFavorite($book_id);
            }else{
                Favorite_books::addFavorite($book_id);
            }
            $result['message'] = 'success';
        }else{
            $result['message'] = 'Something went wrong';
        }
        
        return response($result);
    }
}
