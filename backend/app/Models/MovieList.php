<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieList extends Model
{
    protected $table = 'movielist';
    protected $primarykey = 'id';
    protected $fillable =[
        'theatreName',
        'movieName',
        //'moviePoster',
        'genre',
        'language',
        'duration',
        'firstShow',
        'secondShow',
        'thirdShow',
        'price',
        'imgUrl',
        'decision'
                
    ];
}
