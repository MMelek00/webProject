<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class MainTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id')->index()->unsigned();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id')->index()->unsigned();
            $table->string('title');
            $table->string('cover');
            $table->string('date');
        });
        Schema::create('favorite_books', function (Blueprint $table) {
            $table->increments('id')->index()->unsigned();
            $table->tinyInteger('user_id');
            $table->string('book_id');
        });
        // insert admin
        DB::table('users')->insert(
            array(
                'email' => 'admin',
                'name' => 'admin',
                'password' => '$2y$10$/UB25CPnTCFmQhO0xOnM5elHuMVeNA2AGFha6Qdih1dv/69uqi7hG'
            )
        );
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('books');
        Schema::dropIfExists('favorite_books');
    }
}