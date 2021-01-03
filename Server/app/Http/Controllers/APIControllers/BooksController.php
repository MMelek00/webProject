<?php

namespace App\Http\Controllers\APIControllers;

use App\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BooksController extends Controller
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
    public function index()
    {
        
        $result = Books::getList();
        
        return response($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $title = $request['title'];
        $cover = $request['cover'];
        $date = $request['date'];

        $result = Books::addBook($content,$cover,$date);
        
        return response($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $book_id)
    {
        $content = $request['content'];
        
        $result = Books::editBook($book_id, $content);
        
        return response($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function destroy($book_id)
    {
        $result = Books::deleteBook($book_id);
        
        return response($result);
    }
}
