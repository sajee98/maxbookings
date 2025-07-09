<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross‑domain requests are allowed.
    |
    */

    // which paths should be CORS‑enabled
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // allowed HTTP methods (GET, POST, PUT, etc)
    'allowed_methods' => ['*'],

    // your front‑end origin(s)
    'allowed_origins' => ['http://localhost:5173'],

    // patterns to match on origins (empty unless you need regex)
    'allowed_origins_patterns' => [],

    // which headers are allowed in requests
    'allowed_headers' => ['*'],

    // which headers are exposed back to the client
    'exposed_headers' => [],

    // how long the results of a preflight request can be cached (in seconds)
    'max_age' => 0,

    // whether to allow cookies/auth credentials
    'supports_credentials' => true,

];
