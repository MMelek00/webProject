<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Books extends Model
{
    public static  function getList() {
        
        $id = Auth::user()->id;
        
        $res = DB::table('books')
                    ->select('id', 'title','cover','date')
                    ->get();
        
        
        return $res;
    }
    
    public static  function addBook($title,$cover,$date) {
        
        $id = Auth::user()->id;
                
        DB::table('books')->insert([
            'title' => '',
            'cover' => '',
            'date' => ''
        ]);        
        
        return array('message' => 'Book was added');
    }
    
    public static  function editBook($book_id, $title,$cover,$date) {
        
        $id = Auth::user()->id;
                
        DB::table('books')
                ->where('id', '=', $book_id)
                ->update(['title' => $title,'cover' => $cover,'date' => $date]);      
        
        return array('message' => 'Book was changed');
    }
    
    public static  function deleteBook($book_id) {
        
        $id = Auth::user()->id;
                
        DB::table('books')
                ->where('id', '=', $book_id)
                ->delete();      
        
        return array('message' => 'Book was deleted');
    }
}
